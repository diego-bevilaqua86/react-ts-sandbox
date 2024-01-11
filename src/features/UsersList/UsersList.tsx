import MockAdapter from "axios-mock-adapter";
import { Suspense } from "react";
import { http } from "../../shared/data-access/http";
import {
  /*fetchUsersSuccessMock*/ fetchUsersErrorMock,
} from "../../shared/data-access/mocks/Users.mocks";
import { useFetchUsers } from "../../shared/data-access/queries/Users.queries";
import { USERS_ENDPOINTS } from "../../shared/data-access/services/Users.service";
import { APIError } from "../../shared/types/API.types";
import { User } from "../../shared/types/Users.types";
import { UsersTable } from "../../shared/ui/organisms/UsersTable/UsersTable";
import { ErrorBoundary } from "react-error-boundary";

const httpMock = new MockAdapter(http, { delayResponse: 5000 });

/**
 * Esse aqui é um container (smart) component. Como ele é que dispara a busca de
 * dados, o <Suspense /> e o <ErrorBoundary />, na minha interpretação, deveriam
 * estar aqui, em torno dos componentes dependentes dos dados buscados.
 */
export const UsersList = () => {
  // Descomenta esse pra ver o suspense e a renderização correta
  // const { status, data: mockData } = fetchUsersSuccessMock();
  // Descomenta esse pra ver o suspense e o error-boundary
  const { status, data: mockData } = fetchUsersErrorMock();

  httpMock
    .onGet(USERS_ENDPOINTS.fetchUsers({}).url)
    .reply<Array<User> | APIError>(status, mockData);

  const { data } = useFetchUsers({});

  // O <Suspense /> e o <ErrorBoundary /> aqui nunca são ativados. A ideia
  // era que o título aparecesse e fosse suspensa somente a tabela - que é
  // o componente que está efetivamente esperando dados.
  return (
    <>
    <h1>Listagem de usuários</h1>
    <ErrorBoundary fallback={<p className={'text-danger'}>Erro na lista de usuários.</p>}>
      <Suspense fallback={<p>Aguarde, carregando lista de usuários...</p>}>
        <UsersTable data={data} />
      </Suspense>
    </ErrorBoundary>
    </>
  );
};
