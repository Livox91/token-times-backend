import { Body, Controller, Delete, Get, Post, Param } from '@nestjs/common';

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

    @Get('getAdmins')
    getAdmins() {
        return this.authService.getAdmins();
    }

    @Delete('admins/:id')
    deleteAdmin(@Param('id') id: string) {
        return this.authService.deleteAdmin(id);
    }
}