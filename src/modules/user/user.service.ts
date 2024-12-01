import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UserRepository } from './user.repository';
import { UserRoleEnum } from './entities/user-role.entity';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepository) {}

  async signIn(emailId: string) {
    const getUser = await this.userRepo.signIn(emailId);
    if (!getUser?.id) {
      throw new NotFoundException('User not found');
    }
    const generateToken = jwt.sign(
      { emailId: emailId, exp: Math.floor(Date.now() / 1000) + 60 * 60 },
      'rsa',
    );
    return {
      token: generateToken,
    };
  }

  async createUser(createUserInput: CreateUserInput) {
    createUserInput.userRoles = [{ userRole: UserRoleEnum.USER }];
    return this.userRepo.save(createUserInput);
  }

  async getAllUsers() {
    //load user details with relation user role
    return this.userRepo.find({ relations: ['userRoles'] });
  }

  async getUserDetail(id: string) {
    //load user details with relation user role
    const user = await this.userRepo.findOne({
      where: { id: id },
      relations: ['userRoles'],
    });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async updateUser(id: string, updateUserInput: UpdateUserInput) {
    const user = await this.userRepo.findOneBy({ id: id });
    if (!user) throw new NotFoundException('User not found');
    await this.userRepo.update({ id: id }, { ...updateUserInput });
    return this.userRepo.findOneBy({ id: id });
  }

  async removeUser(id: string) {
    const user = await this.userRepo.findOneBy({ id: id });
    if (!user) throw new NotFoundException('User not found');
    const deleteUser = await this.userRepo.softDelete(id);
    if (!deleteUser?.affected) {
      throw new UnprocessableEntityException('Failed to delete user');
    }
    return 'Deleted Successfully';
  }

  async createAdminUser() {
    const createAdminInput: CreateUserInput = {
      firstName: 'BalaYogesh',
      lastName: 'Dev',
      emailId: process.env.ADMIN_EMAIL,
      userRoles: [
        { userRole: UserRoleEnum.ADMIN },
        { userRole: UserRoleEnum.USER },
      ],
    };
    const checkAdminCreation = await this.userRepo.findOneBy({
      emailId: process.env.ADMIN_EMAIL,
    });
    if (!checkAdminCreation) {
      await this.userRepo.save(createAdminInput);
    }
  }

  async validateUser(payload: any) {
    let user = null;
    if ('emailId' in payload) {
      user = await this.userRepo.findOneBy({ emailId: payload?.emailId });
    }
    return user;
  }
}
