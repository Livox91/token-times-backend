import {
    ConflictException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { PrismaService } from '../prisma/prisma.service';

type Credentials = {
    email: string;
    password: string;
};

@Injectable()
export class AuthService {
    private readonly saltRounds = 12;

    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService,
    ) { }

    async register({ email, password }: Credentials) {
        const normalizedEmail = this.normalizeEmail(email);
        this.validateCredentials(normalizedEmail, password);

        const existingUser = await this.prisma.user.findUnique({
            where: { email: normalizedEmail },
        });

        if (existingUser) {
            throw new ConflictException('An account with this email already exists');
        }

        const passwordHash = await bcrypt.hash(password, this.saltRounds);
        const user = await this.prisma.user.create({
            data: { email: normalizedEmail, passwordHash },
        });

        return {
            access_token: await this.createToken(user.id, user.email),
            user: { id: user.id, email: user.email },
        };
    }

    async login({ email, password }: Credentials) {
        const normalizedEmail = this.normalizeEmail(email);
        this.validateCredentials(normalizedEmail, password);

        const user = await this.prisma.user.findUnique({
            where: { email: normalizedEmail },
        });

        if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
            throw new UnauthorizedException('Invalid email or password');
        }

        return {
            access_token: await this.createToken(user.id, user.email),
            user: { id: user.id, email: user.email },
        };
    }

    private createToken(id: string, email: string) {
        return this.jwtService.signAsync({ sub: id, email });
    }

    private normalizeEmail(email: string) {
        return email?.trim().toLowerCase();
    }

    private validateCredentials(email: string, password: string) {
        if (!email || !password) {
            throw new UnauthorizedException('Email and password are required');
        }
    }
}