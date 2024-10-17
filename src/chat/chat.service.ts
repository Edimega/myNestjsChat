import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './message.entity';

@Injectable()
export class ChatService {
	constructor(
		@InjectRepository(Message)
		private messagesRepository: Repository<Message>,
	) { }

	async addMessage(content: string): Promise<Message> {
		const message = this.messagesRepository.create({
			content,
			timestamp: new Date(),
		});
		return this.messagesRepository.save(message);
	}

	async getAllMessages(): Promise<Message[]> {
		return this.messagesRepository.find();
	}
}