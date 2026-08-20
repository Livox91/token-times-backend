import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from './auth.service';

type Credentials = {
    email: string;
    password: string;
};

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('register')

    register(@Body() credentials: Credentials) {
        return this.authService.register(credentials);
    }

    @Post('login')
    login(@Body() credentials: Credentials) {
        return this.authService.login(credentials);
    }
}