export interface CreateUserParams {
  username: string;
  email?: string;
  password: string;
}

export interface UpdateUserParams {
  username: string;
  email?: string;
  password: string;
}

export interface CreateUserProfileParams {
  firstName: string;
  lastName: string;
  age: number;
  dob: string;
}

export interface CreateUserPostParams {
  title: string;
  description: string;
}
