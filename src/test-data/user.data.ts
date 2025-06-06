import { USER_EMAIL } from '../env.config';
import { LoginUserModel } from '../models/user.model';

export const testUser1: LoginUserModel = {
  userEmail: USER_EMAIL ?? '[NOT SET]',
  userPassword: process.env.USER_PASSWORD ?? '[NOT SET]',
};
