import MockAdapter from "axios-mock-adapter";
import { FC } from "react";
import { Table } from "react-bootstrap";
import { http } from "../../shared/data-access/http";
import {
  fetchUsersSuccessMock /*fetchUsersErrorMock*/,
} from "../../shared/data-access/mocks/Users.mocks";
import { useFetchUsers } from "../../shared/data-access/queries/Users.queries";
import { USERS_ENDPOINTS } from "../../shared/data-access/services/Users.service";
import { APIError } from "../../shared/types/API.types";
import { User } from "../../shared/types/Users.types";

const httpMock = new MockAdapter(http, { delayResponse: 5000 });

// eslint-disable-next-line @typescript-eslint/ban-types
export type UsersListProps = {};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const UsersList: FC<UsersListProps> = (props: UsersListProps) => {
  // Descomenta esse pra ver o suspense e a renderização correta
  const { status, data: mockData } = fetchUsersSuccessMock();
  // Descomenta esse pra ver o suspense e o error-boundary
  // const { status, data: mockData } = fetchUsersErrorMock();

  httpMock
    .onGet(USERS_ENDPOINTS.fetchUsers({}).url)
    .reply<Array<User> | APIError>(status, mockData);

  const { data } = useFetchUsers({});

  return (
    <Table>
      <thead>
        <tr>
          <th>Nome</th>
          <th>E-mail</th>
          <th>Empresa</th>
        </tr>
      </thead>
      <tbody>
        {data.map((user) => (
          <tr key={user._id}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.companyId}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default UsersList;
