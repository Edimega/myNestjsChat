import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class PrivateMessage {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(() => User, user => user.sentMessages)
	sender: User;

	@ManyToOne(() => User, user => user.receivedMessages)
	recipient: User;

	@Column()
	content: string;

	@Column()
	timestamp: Date;
}