import { Suspense } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { ErrorBoundary } from "react-error-boundary";
import { UsersList } from "./features/UsersList/UsersList";

export const App = () => {
  // Ativa <Suspense /> e <ErrorBoundary /> aqui, ao invés de no container.
  // O problema é que, numa aplicação real, eu não teria a instância do
  // componente aqui - ela estaria sendo renderizada por um router em um
  // <Outlet />.
  // Mesmo com um router, na verdade, nada impediria de envolver o componente
  // com <Suspense /> e <ErrorBoundary />, mas isso suspenderia todo a tela,
  // ao invés de somente a tabela, como pretendido nesse exemplo.
  return (
    <Container className={ 'mt-3' }>
      <Row>
        <Col>
          {/* <ErrorBoundary fallback={<p className={'text-danger'}>Erro ao buscar lista de usuários</p>}> */}
            {/* <Suspense fallback={<p>Aguarde, carregando...</p>}> */}
              <UsersList />
            {/* </Suspense> */}
          {/* </ErrorBoundary> */}
        </Col>
      </Row>
    </Container>
  );
};
