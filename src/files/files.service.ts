import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { randomUUID } from 'crypto';
import { basename, extname } from 'path';
import { DeleteObjectCommand, GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

type UploadUrlRequest = {
    filename: string;
    contentType: string;
    prefix?: string;
};

type DownloadUrlRequest = {
    fileKey: string;
    downloadFilename?: string;
};

type DeleteUrlRequest = {
    fileKey: string;
};

@Injectable()
export class FilesService {
    private s3Client?: S3Client;

    constructor(private readonly configService: ConfigService) { }

    private getRequiredAwsConfig() {
        const region = this.configService.get<string>('AWS_REGION');
        const accessKeyId = this.configService.get<string>('AWS_ACCESS_KEY_ID');
        const secretAccessKey = this.configService.get<string>('AWS_SECRET_ACCESS_KEY');
        const bucket = this.configService.get<string>('AWS_BUCKET');


        if (!region || !accessKeyId || !secretAccessKey || !bucket) {
            throw new InternalServerErrorException('AWS S3 configuration is missing.');
        }

        return {
            region,
            accessKeyId,
            secretAccessKey,
            bucket,
        };
    }

    private getClient() {
        if (!this.s3Client) {
            const { region, accessKeyId, secretAccessKey } = this.getRequiredAwsConfig();

            this.s3Client = new S3Client({
                region,
                credentials: {
                    accessKeyId,
                    secretAccessKey,
                },
            });
        }

        return this.s3Client;
    }

    private buildFileKey(filename: string, prefix = 'uploads') {
        const safeName = basename(filename).replace(/[^a-zA-Z0-9._-]/g, '_');
        return `${prefix.replace(/\/$/, '')}/${randomUUID()}${extname(safeName) || ''}-${safeName}`;
    }

    async createUploadUrl(payload: UploadUrlRequest) {
        const { bucket } = this.getRequiredAwsConfig();
        const fileKey = this.buildFileKey(payload.filename, payload.prefix);

        const command = new PutObjectCommand({
            Bucket: bucket,
            Key: fileKey,
            ContentType: payload.contentType,
        });

        const uploadUrl = await getSignedUrl(this.getClient(), command, { expiresIn: 900 });

        return {
            fileKey,
            uploadUrl,
            expiresIn: 900,
        };
    }

    async createDownloadUrl(payload: DownloadUrlRequest) {
        const { bucket } = this.getRequiredAwsConfig();
        const command = new GetObjectCommand({
            Bucket: bucket,
            Key: payload.fileKey,
            ResponseContentDisposition: payload.downloadFilename
                ? `attachment; filename="${basename(payload.downloadFilename).replace(/\"/g, '')}"`
                : undefined,
        });

        const downloadUrl = await getSignedUrl(this.getClient(), command, { expiresIn: 900 });

        return {
            fileKey: payload.fileKey,
            downloadUrl,
            expiresIn: 900,
        };
    }

    async createDeleteUrl(payload: DeleteUrlRequest) {
        const { bucket } = this.getRequiredAwsConfig();
        const command = new DeleteObjectCommand({
            Bucket: bucket,
            Key: payload.fileKey,
        });

        const deleteUrl = await getSignedUrl(this.getClient(), command, { expiresIn: 900 });

        return {
            fileKey: payload.fileKey,
            deleteUrl,
            expiresIn: 900,
        };
    }
}