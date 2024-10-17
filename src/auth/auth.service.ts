import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from '@nestjs-modules/mailer';
import { User } from 'src/users/user.entity';

@Injectable()
export class AuthService {
	constructor(
		private readonly jwtService: JwtService,
		private readonly mailerService: MailerService
	) { }

	async login(user: any) {
		const payload = { username: user.username, sub: user.id };
		return {
			access_token: this.jwtService.sign(payload),
		};
	}
	async sendVerificationEmail(user: User) {
		const token = this.jwtService.sign({ userId: user.id });
		const url = `http://localhost:3000/auth/verify-email?token=${token}`;
		await this.mailerService.sendMail({
			to: user.email,
			subject: 'Email Verification',
			html: `Click <a href="${url}">here</a> to verify your email.`,
		});
	}
}