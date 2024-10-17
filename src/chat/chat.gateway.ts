import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { ChatService } from './chat.service';

@WebSocketGateway()
export class ChatGateway {
	@WebSocketServer()
	server: Server;

	constructor(private readonly chatService: ChatService) { }

	@SubscribeMessage('sendMessage')
	handleMessage(@MessageBody() message: string): void {
		this.chatService.addMessage(message);
		this.server.emit('message', message); // Emitir mensaje a todos los clientes conectados
	}

	@SubscribeMessage('getMessages')
	handleGetMessages(): string[] {
		return this.chatService.getAllMessages(); // Enviar todos los mensajes al cliente
	}

	@SubscribeMessage('privateMessage')
	handlePrivateMessage(@MessageBody() { senderId, recipientId, content }: { senderId: number, recipientId: number, content: string }) {
		this.server.to(recipientId.toString()).emit('newPrivateMessage', { senderId, content });
	}

	handleConnection(client: any) {
		const userId = client.handshake.query.userId;
		client.join(userId.toString()); // El usuario se une a una "sala" con su ID
	}

	handleDisconnect(client: any) {
		console.log('Client disconnected:', client.id);
	}

	@SubscribeMessage('newNotification')
	handleNewNotification(@MessageBody() notification: any) {
		this.server.to(notification.recipientId.toString()).emit('newNotification', notification);
	}
}