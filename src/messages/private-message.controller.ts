import { Controller, Post, Body, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PrivateMessageService } from './private-message.service';
import { UserService } from '../users/user.service';

@UseGuards(JwtAuthGuard)
@Controller('messages')
export class PrivateMessageController {
	constructor(
		private readonly messageService: PrivateMessageService,
		private readonly userService: UserService,
	) { }

	@Post('send')
	async sendMessage(
		@Body('senderId') senderId: number,
		@Body('recipientId') recipientId: number,
		@Body('content') content: string,
	) {
		const sender = await this.userService.findUserById(senderId);
		const recipient = await this.userService.findUserById(recipientId);
		return this.messageService.sendMessage(sender, recipient, content);
	}

	@Post('history')
	async getMessageHistory(
		@Body('userId1') userId1: number,
		@Body('userId2') userId2: number,
	) {
		return this.messageService.getMessages(userId1, userId2);
	}

	@Post('read/:messageId')
	async markMessageAsRead(@Param('messageId') messageId: number) {
		return this.messageService.markAsRead(messageId);
	}
}