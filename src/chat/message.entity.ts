import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Message {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	content: string;

	@Column()
	timestamp: Date;

	@Column({ default: false })
	isRead: boolean;
}