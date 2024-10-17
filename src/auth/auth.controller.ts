import { Controller, Post, Body, UnauthorizedException, Query } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { UserService } from '../users/user.service';

@Controller('auth')
export class AuthController {
	constructor(
		private readonly authService: AuthService,
		private readonly jwtService: JwtService,
	) { }

	@Post('login')
	async login(@Body('username') username: string, @Body('password') password: string) {
		const user = await this.userService.findUserByUsername(username);
		if (!user || user.password !== password) {
			throw new UnauthorizedException('Invalid credentials');
		}
		return this.authService.login(user);
	}

	@Post('verify-email')
	async verifyEmail(@Query('token') token: string) {
		const payload = this.jwtService.verify(token);
		const user = await this.userService.findUserById(payload.userId);
		user.isEmailVerified = true;
		await this.userService.saveUser(user);
		return 'Email verified successfully';
	}
}