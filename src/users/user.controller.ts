import { Controller, Get, Post, Delete, Body, Param, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './create-user.dto';
import { User } from 'src/TypeOrm/user.entity';

@Controller('users')
export class UserController {
	constructor(private readonly userService: UserService) { }

	// Endpoint to fetch all users
	@Get()
	async findAll(): Promise<User[]> {
		return await this.userService.findAll();
	}

	// Endpoint to fetch a user by username
	@Get(':username')
	async findByUsername(@Param('username') username: string): Promise<User> {
		return await this.userService.findByUsername(username);
	}

	// Endpoint to create a new user
	@Post()
	@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
	async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
		const { username, email, password } = createUserDto;
		return await this.userService.createUser({ username, email, password });
	}

	// Endpoint to fetch a user by ID
	@Get(':id')
	async findById(@Param('id') id: number): Promise<User> {
		return await this.userService.findById(id);
	}

	// Endpoint to update a user by ID
	@Post(':id')
	@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
	async updateUser(@Param('id') id: number, @Body() attrs: Partial<User>): Promise<User> {
		return await this.userService.updateUser(id, attrs);
	}

	// Endpoint to delete a user by ID
	@Delete(':id')
	async deleteUser(@Param('id') id: number): Promise<User> {
		return await this.userService.deleteUser(id);
	}
}