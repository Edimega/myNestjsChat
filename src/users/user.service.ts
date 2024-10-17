import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { Contact } from './contact.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(User)
		private usersRepository: Repository<User>,
		@InjectRepository(Contact)
		private contactRepository: Repository<Contact>,
	) { }

	findUserByUsername(username: string): Promise<User | undefined> {
		return this.usersRepository.findOne({ where: { username } });
	}

	async getUserContacts(userId: number): Promise<Contact[]> {
		const user = await this.usersRepository.findOne({ where: { id: userId }, relations: ['contacts'] });
		return user.contacts;
	}


	async updateUserProfile(name: string, profilePictureUrl: string): Promise<User> {
		const user = await this.findUserByUsername(name);
		user.name = name;
		user.profilePictureUrl = profilePictureUrl;
		return this.usersRepository.save(user);
	}

	async addContact(userId: number, contactId: number): Promise<Contact> {
		const user = await this.usersRepository.findOne({ where: { id: userId } });
		const contact = await this.usersRepository.findOne({ where: { id: contactId } });
		const newContact = this.contactRepository.create({ user, contact });
		return this.contactRepository.save(newContact);
	}

	async removeContact(userId: number, contactId: number): Promise<void> {
		const contact = await this.contactRepository.findOne({ where: { user: { id: userId }, contact: { id: contactId } } });
		if (contact) {
			await this.contactRepository.remove(contact);
		}
	}

	async createUser(username: string, password: string): Promise<User> {
		const hashedPassword = await bcrypt.hash(password, 10);
		const newUser = this.usersRepository.create({ username, password: hashedPassword });
		return this.usersRepository.save(newUser);
	}

	async validateUser(username: string, password: string): Promise<User> {
		const user = await this.usersRepository.findOne({ where: { username } });
		if (user && await bcrypt.compare(password, user.password)) {
			return user;
		}
		return null;
	}
}