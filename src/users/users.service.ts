import { UpdateUserParams, CreateUserPostParams } from './utils/types.d';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserParams, CreateUserProfileParams } from './utils/types';
import { User } from 'src/typeorm/entities/User';
import { Profile } from 'src/typeorm/entities/Profile';
import { Post } from 'src/typeorm/entities/Post';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
    @InjectRepository(Post) private postRepository: Repository<Post>,
  ) {}

  findUsers() {
    return this.userRepository.find({ relations: ['profile', 'posts'] });
  }

  async createUser(userDetails: CreateUserParams) {
    const { email } = userDetails;
    const user = await this.userRepository.findOneBy({ email });

    if (user) {
      throw new HttpException(
        'User Account Already Exists',
        HttpStatus.BAD_REQUEST,
      );
    }
    const newUser = this.userRepository.create({
      ...userDetails,
      createdAt: new Date(),
    });

    return this.userRepository.save(newUser);
  }

  updateUser(id: number, updateUserDetails: UpdateUserParams) {
    return this.userRepository.update({ id }, { ...updateUserDetails }); // spread the update details, this will update only the ones, they have made changes to, if its the username it will update the username
  }

  deleteUser(id: number) {
    return this.userRepository.delete({ id });
  }

  async createUserProfile(
    id: number,
    createUserProfileDetails: CreateUserProfileParams,
  ) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new HttpException(
        'User not found. cannot create profile',
        HttpStatus.BAD_REQUEST,
      );
    }

    const newProfile = this.profileRepository.create(createUserProfileDetails);
    const saveProfile = await this.profileRepository.save(newProfile);
    user.profile = saveProfile;
    return this.userRepository.save(user);
  }

  async findUserProfile(id: number) {
    return this.profileRepository.findOneBy({ id });
  }

  async createUserPost(id: number, userPost: CreateUserPostParams) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new HttpException(
        'User not found. cannot create post',
        HttpStatus.BAD_REQUEST,
      );
    }
    const newPost = this.postRepository.create({ ...userPost, user });
    const savedPost = await this.postRepository.save(newPost);
    return savedPost;
  }
}
