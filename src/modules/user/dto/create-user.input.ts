import { InputType, Field } from '@nestjs/graphql';
import { UserRoleEnum } from '../entities/user-role.entity';


@InputType()
export class CreateUserRole {
  @Field(() => UserRoleEnum)
  userRole: UserRoleEnum;
}

@InputType()
export class CreateUserInput {
  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  emailId: string;

  userRoles: CreateUserRole[];
}
