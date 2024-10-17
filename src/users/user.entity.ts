import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	username: string;

	@Column()
	password: string;

	@Column({ nullable: true })
	name: string;

	@Column({ nullable: true })
	profilePictureUrl: string;

	@Column()
	email: string;

	@Column({ type: 'enum', enum: ['user', 'admin'], default: 'user' })
	role: string;

	@OneToMany(() => PrivateMessage, message => message.sender)
	sentMessages: PrivateMessage[];

	@OneToMany(() => PrivateMessage, message => message.recipient)
	receivedMessages: PrivateMessage[];

	@OneToMany(() => Notification, notification => notification.recipient)
	notifications: Notification[];

	@Column({ default: false })
	isEmailVerified: boolean;
}