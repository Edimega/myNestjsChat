import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserService } from './user.service';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UserController {
	constructor(private readonly userService: UserService) { }

	@Post('register')
	async register(@Body('username') username: string, @Body('password') password: string) {
		return this.userService.createUser(username, password);
	}

	@Put('profile')
	async updateProfile(
		@Body('name') name: string,
		@Body('profilePictureUrl') profilePictureUrl: string,
	) {
		return this.userService.updateUserProfile(name, profilePictureUrl);
	}

	@Get(':id/contacts')
	async getUserContacts(@Param('id') userId: number) {
		return this.userService.getUserContacts(userId);
	}

	@Post(':id/contacts')
	async addContact(@Param('id') userId: number, @Body('contactId') contactId: number) {
		return this.userService.addContact(userId, contactId);
	}

	@Delete(':id/contacts/:contactId')
	async removeContact(@Param('id') userId: number, @Param('contactId') contactId: number) {
		return this.userService.removeContact(userId, contactId);
	}
}