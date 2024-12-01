import { DataSource, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private readonly dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async signIn(emailId: string) {
    const getUserDetails = await this.createQueryBuilder('user')
      .leftJoin('user.userRoles', 'userRoles')
      .where('Lower(user.emailId) = :emailId', { emailId: emailId })
      .getOne();

    return getUserDetails;
  }
}
