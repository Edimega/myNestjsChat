import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../TypeOrm/user.entity';
import { CreateUserDto } from './create-user.dto';

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(User)
		private usersRepository: Repository<User>,
	) { }

	// Fetch all users
	async findAll(): Promise<User[]> {
		return await this.usersRepository.find();
	}

	// Fetch a user by username
	async findByUsername(username: string): Promise<User> {
		const user = await this.usersRepository.findOne({ where: { username } });
		if (!user) throw new NotFoundException(`User with username ${username} not found`);
		return user;
	}

	// Create a new user
	async createUser(createUserDto: CreateUserDto): Promise<User> {
		// Check if a user with the given email already exists
		const userExists = await this.usersRepository.findOne({ where: { email: createUserDto.email } });
		if (userExists) throw new NotFoundException(`User with email ${createUserDto.email} already exists`);
		const user = this.usersRepository.create(createUserDto);
		return await this.usersRepository.save(user);
	}

	// Fetch a user by ID
	async findById(id: number): Promise<User> {
		const user = await this.usersRepository.findOne({ where: { id } });
		if (!user) throw new NotFoundException(`User with ID ${id} not found`);
		return user;
	}

	// Update a user by ID
	async updateUser(id: number, attrs: Partial<User>): Promise<User> {
		const user = await this.findById(id);
		if (!user) throw new NotFoundException(`User with ID ${id} not found`);
		Object.assign(user, attrs);
		return await this.usersRepository.save(user);
	}

	// Delete a user by ID
	async deleteUser(id: number): Promise<User> {
		const user = await this.findById(id);
		if (!user) throw new NotFoundException(`User with ID ${id} not found`);
		return await this.usersRepository.remove(user);
	}
}