import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import dbconfig from './database/dbconfig';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { SocketModule } from './modules/socket/socket.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: './schema.gql',
      driver: ApolloDriver,
      playground: true,
      context: ({ req }) => ({ headers: req?.headers }),
    }),
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      load: [dbconfig],
    }),
    DatabaseModule,
    AuthModule,
    UserModule,
    SocketModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
