import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PrivateMessage } from './private-message.entity';
import { User } from '../users/user.entity';

@Injectable()
export class PrivateMessageService {
	constructor(
		@InjectRepository(PrivateMessage)
		private privateMessageRepository: Repository<PrivateMessage>,
	) { }

	async sendMessage(sender: User, recipient: User, content: string): Promise<PrivateMessage> {
		const message = this.privateMessageRepository.create({
			sender,
			recipient,
			content,
			timestamp: new Date(),
		});

		// Crear una notificación para el destinatario
		await this.notificationService.createNotification(recipient, 'private_message', `Nuevo mensaje de ${sender.username}`);

		return this.privateMessageRepository.save(message);
	}

	async getMessages(senderId: number, recipientId: number): Promise<PrivateMessage[]> {
		return this.privateMessageRepository.find({
			where: [
				{ sender: { id: senderId }, recipient: { id: recipientId } },
				{ sender: { id: recipientId }, recipient: { id: senderId } },
			],
			order: { timestamp: 'ASC' },
		});
	}

	async markAsRead(messageId: number): Promise<void> {
		const message = await this.privateMessageRepository.findOne({ where: { id: messageId } });
		if (message) {
			message.isRead = true;
			await this.privateMessageRepository.save(message);
		}
	}
}