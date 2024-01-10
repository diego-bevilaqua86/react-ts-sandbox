import { faker } from "@faker-js/faker";
import { APIError, APIMockData } from "../../types/API.types";
import { User } from "../../types/Users.types";

export const fetchUsersSuccessMock: () => APIMockData<Array<User>> = () => {
  const users: Array<User> = [];

  for (let index = 0; index < 20; index++) {
    users.push({
      _id: faker.database.mongodbObjectId(),
      name: faker.person.fullName(),
      email: faker.internet.email(),
      companyId: faker.database.mongodbObjectId(),
    });
  }

  const mock: APIMockData<Array<User>> = {
    status: 200,
    data: users,
  };
  return mock;
};

export const fetchUsersErrorMock: () => APIMockData<APIError> = () => {
  const mock: APIMockData<APIError> = {
    status: 400,
    data: { message: "Erro ao buscar usuários." },
  };
  return mock;
};
