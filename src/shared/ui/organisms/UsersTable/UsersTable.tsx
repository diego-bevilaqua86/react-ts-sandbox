import { Table } from "react-bootstrap"
import { User } from "../../../types/Users.types"
import { FC } from "react"

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
    return <Table striped bordered>
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
}