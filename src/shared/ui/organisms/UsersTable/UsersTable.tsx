import { Table } from "react-bootstrap"
import { User } from "../../../types/Users.types"
import { FC } from "react"
import { fetchUsersErrorMock, fetchUsersSuccessMock } from "../../../data-access/mocks/Users.mocks"
import MockAdapter from "axios-mock-adapter";
import { http } from "../../../data-access/http";
import { USERS_ENDPOINTS } from "../../../data-access/services/Users.service";
import { APIError } from "../../../types/API.types";
import { useFetchUsers } from "../../../data-access/queries/Users.queries";

const httpMock = new MockAdapter(http, { delayResponse: 5000 });

export type UsersTableProps = {
    data: Array<User>
}

/**
 * Esse aqui é um presentational (dumb) component. Fácil de testar e mockar,
 * já que recebe os dados via props. Mas pra que, como pretendido, somente a
 * tabela ficasse suspensa esperando dados, eu precisaria trazer o hook de
 * busca da lista de usuários pra cá.
 */
export const UsersTable: FC<UsersTableProps> = ({data}) => {
  // Descomenta esse pra ver o suspense e a renderização correta
  const { status, data: mockData } = fetchUsersSuccessMock();
  // Descomenta esse pra ver o suspense e o error-boundary
  // const { status, data: mockData } = fetchUsersErrorMock();

  httpMock
    .onGet(USERS_ENDPOINTS.fetchUsers({}).url)
    .reply<Array<User> | APIError>(status, mockData);

  const { data: apiData } = useFetchUsers({});

    return <Table striped bordered>
    <thead>
      <tr>
        <th>Nome</th>
        <th>E-mail</th>
        <th>Empresa</th>
      </tr>
    </thead>
    <tbody>
      {apiData.map((user) => (
        <tr key={user._id}>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td>{user.companyId}</td>
        </tr>
      ))}
    </tbody>
  </Table>
}