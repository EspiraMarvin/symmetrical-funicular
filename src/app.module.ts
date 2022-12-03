import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './typeorm/entities/User';
import { Profile } from './typeorm/entities/Profile';
import { UsersModule } from './users/users.module';
import { Post } from './typeorm/entities/Post';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'general',
      password: 'general123secret',
      database: 'nestjs_mysql',
      entities: [User, Profile, Post],
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController, AuthController],
  providers: [AppService],
})
export class AppModule {}
