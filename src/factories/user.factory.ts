import { RegisterUser } from '../models/user.models';
import { faker } from '@faker-js/faker';

export function randomUser(): RegisterUser {
  const registerUserData: RegisterUser = {
    userFirstName: faker.person.firstName().replace(/[^A-Za-z]/g, ''),
    userLastName: faker.person.lastName().replace(/[^A-Za-z]/g, ''),
    userEmail: '',
    userPassword: faker.internet.password(),
  };
  registerUserData.userEmail = faker.internet.email({
    firstName: registerUserData.userFirstName,
    lastName: registerUserData.userLastName,
  });
  return registerUserData;
}
