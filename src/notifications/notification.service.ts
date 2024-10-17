import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './notification.entity';
import { User } from '../users/user.entity';

@Injectable()
export class NotificationService {
	constructor(
		@InjectRepository(Notification)
		private notificationRepository: Repository<Notification>,
	) { }

	async createNotification(recipient: User, type: string, message: string): Promise<Notification> {
		const notification = this.notificationRepository.create({
			recipient,
			type,
			message,
			isRead: false,
			timestamp: new Date(),
		});
		return this.notificationRepository.save(notification);
	}

	async markAsRead(notificationId: number): Promise<void> {
		const notification = await this.notificationRepository.findOne({ where: { id: notificationId } });
		if (notification) {
			notification.isRead = true;
			await this.notificationRepository.save(notification);
		}
	}

	async getUnreadNotifications(userId: number): Promise<Notification[]> {
		return this.notificationRepository.find({
			where: { recipient: { id: userId }, isRead: false },
		});
	}
}