import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('notifications')
export class NotificationController {
	constructor(private readonly notificationService: NotificationService) { }

	@Get(':userId/unread')
	async getUnreadNotifications(@Param('userId') userId: number) {
		return this.notificationService.getUnreadNotifications(userId);
	}
}