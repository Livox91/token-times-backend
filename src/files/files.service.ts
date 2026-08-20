import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DeleteObjectCommand, GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { randomUUID } from 'crypto';
import { basename, extname } from 'path';

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
        const region = this.configService.get<string>('AWS_REGION') ?? this.configService.get<string>('region_name');
        const accessKeyId = this.configService.get<string>('AWS_ACCESS_KEY_ID') ?? this.configService.get<string>('ACCESS_KEY_ID');
        const secretAccessKey = this.configService.get<string>('AWS_SECRET_ACCESS_KEY') ?? this.configService.get<string>('SECRET_ACCESS_KEY');
        const bucket = this.configService.get<string>('AWS_BUCKET') ?? this.configService.get<string>('SUPABASE_BUCKET');
        const endpoint = this.configService.get<string>('AWS_ENDPOINT') ?? this.configService.get<string>('endpoint_url');

        if (!region || !accessKeyId || !secretAccessKey || !bucket || !endpoint) {
            throw new InternalServerErrorException('Supabase Storage S3 configuration is missing.');
        }

        return {
            region,
            accessKeyId,
            secretAccessKey,
            bucket,
            endpoint,
        };
    }

    private getClient() {
        if (!this.s3Client) {
            const { region, accessKeyId, secretAccessKey, endpoint } = this.getRequiredAwsConfig();

            this.s3Client = new S3Client({
                forcePathStyle: true,
                region,
                endpoint,
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