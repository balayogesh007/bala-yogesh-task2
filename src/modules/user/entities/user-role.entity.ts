import { ObjectType, Field, registerEnumType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

export enum UserRoleEnum {
  ADMIN = 'Admin',
  USER = 'User',
}

registerEnumType(UserRoleEnum, {
  name: 'UserRoleEnum',
});

@ObjectType()
@Entity({ name: 'user_roles' })
export class UserRole {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  @Field()
  id: string;

  @Column({ name: 'user_id' })
  @Field()
  userId: string;

  @ManyToOne(() => User, {
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'user_role', type: 'enum', enum: UserRoleEnum })
  @Field(() => UserRoleEnum)
  userRole: UserRoleEnum;

  @CreateDateColumn({
    type: 'timestamptz',
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    name: 'updated_at',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    type: 'timestamptz',
    name: 'deleted_at',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  deletedAt: Date;
}
