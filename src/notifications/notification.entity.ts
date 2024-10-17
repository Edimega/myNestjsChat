import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class Notification {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(() => User, user => user.notifications)
	recipient: User;

	@Column()
	type: string;

	@Column()
	message: string;

	@Column()
	isRead: boolean;

	@Column()
	timestamp: Date;
}