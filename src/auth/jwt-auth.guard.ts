import {
    CanActivate,
    ExecutionContext,
    Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';

type AuthenticatedRequest = Request & {
    user?: { sub: string; email: string };
};

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const http = context.switchToHttp();
        const request = http.getRequest<AuthenticatedRequest>();
        const response = http.getResponse<Response>();
        const token = this.extractToken(request);

        try {
            if (!token) {
                throw new Error('Missing token');
            }

            request.user = await this.jwtService.verifyAsync(token);
            return true;
        } catch {
            response.redirect('/');
            return false;
        }
    }

    private extractToken(request: Request): string | undefined {
        const authorization = request.headers.authorization;
        if (!authorization?.startsWith('Bearer ')) {
            return undefined;
        }

        return authorization.slice(7).trim() || undefined;
    }
}