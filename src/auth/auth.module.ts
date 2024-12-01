import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../modules/user/user.module';
import { Module } from '@nestjs/common';
import { JwtAuthGuard } from './guards/auth.guard';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' }), UserModule],
  providers: [JwtStrategy, JwtAuthGuard],
  exports: [JwtStrategy],
})
export class AuthModule {}
