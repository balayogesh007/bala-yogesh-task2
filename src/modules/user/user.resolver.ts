import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { SignInResponse } from './dto/responses.output';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/auth.guard';
@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => User)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.createUser(createUserInput);
  }

  @Query(() => SignInResponse)
  async signIn(@Args('emailId') emailId: string){
    return this.userService.signIn(emailId);
  }

  @Query(() => [User])
  async getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Query(() => User)
  async getUserDetail(@Args('id') id: string) {
    return this.userService.getUserDetail(id);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => User)
  async updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.userService.updateUser(updateUserInput.id, updateUserInput);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => String)
  async removeUser(@Args('id') id: string) {
    return this.userService.removeUser(id);
  }
}
