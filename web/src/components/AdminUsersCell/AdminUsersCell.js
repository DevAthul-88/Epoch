import AdminUsersTable from "../AdminUsersTable/AdminUsersTable"
import Loaders from "../Loader/Loader"



export const QUERY = gql`
  query UsersQuery($page: Int) {
    usersPage(page: $page) {
      users {
        id
        avatar
        name
        email
        createdAt
        updatedAt
        verified
      }
      count
    }
  }
`

export const Loading = () => <Loaders />

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ usersPage }) => {
  return (
    <>
      <AdminUsersTable Users={usersPage.users}/>
    </>
  )
}
