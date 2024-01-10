import { Suspense, lazy } from "react";
import { ErrorBoundary } from "react-error-boundary";

const UsersList = lazy(() => import("./features/UsersList/UsersList"));

export const App = () => {
  return (
    <ErrorBoundary fallback={<p>Erro ao buscar lista de usuários</p>}>
      <Suspense fallback={<p>Aguarde, carregando...</p>}>
        <UsersList />
      </Suspense>
    </ErrorBoundary>
  );
};
