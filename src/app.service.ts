import { Injectable } from '@nestjs/common';
import { UserService } from './modules/user/user.service';

@Injectable()
export class AppService {
  constructor(private readonly userService: UserService) {}
  async onApplicationBootstrap() {
    //Create a admin user while application starts
    await this.userService.createAdminUser();
  }
  async healthCheck(): Promise<string> {
    return 'Health Check Success';
  }
}
