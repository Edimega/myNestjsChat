import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users')
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ unique: true })
	username: string;

	// email debe ser unico
	@Column({ unique: true })
	email: string

	@Column()
	password: string;
}