import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import {
  CreateUserDto,
  UpdateUserDto,
  UserProfileDto,
  CreateUserPostDto,
} from './dtos';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Get()
  async getUsers() {
    const users = await this.usersService.findUsers();
    return users;
  }

  @Post()
  createUser(@Body() dto: CreateUserDto) {
    return this.usersService.createUser(dto);
  }

  @Patch(':id')
  async updateUserById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateUserDto,
  ) {
    await this.usersService.updateUser(id, updateDto);
  }

  @Delete(':id')
  async deleteUserById(@Param('id', ParseIntPipe) id: number) {
    await this.usersService.deleteUser(id);
  }

  @Post(':id/profiles')
  createUserProfile(
    @Param('id', ParseIntPipe) id: number,
    @Body() userProfile: UserProfileDto,
  ) {
    return this.usersService.createUserProfile(id, userProfile);
  }

  @Get(':id/profiles')
  async getUserProfile(@Param('id', ParseIntPipe) id: number) {
    const profile = await this.usersService.findUserProfile(id);
    return profile;
  }

  @Post(':id/posts')
  createUserPost(
    @Param('id', ParseIntPipe) id: number,
    @Body() userPost: CreateUserPostDto,
  ) {
    return this.usersService.createUserPost(id, userPost);
  }
}
