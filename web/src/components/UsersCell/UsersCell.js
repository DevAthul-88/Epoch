import { SimpleGrid } from '@mantine/core'
import { useAuth } from '@redwoodjs/auth'
import Loaders from '../Loader/Loader'
import Pagination from '../Pagination/Pagination'
import { UserInfoAction } from '../Usercard/Usercard'


export const QUERY = gql`
  query UsersQuery($page: Int) {
    usersPage(page: $page) {
      users {
        id
        avatar
        name
        email
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

export const beforeQuery = ({ page , id }) => {
  page = page ? parseInt(page, 10) : 1

  return { variables: { page , id } }
}

export const Success = ({ usersPage }) => {
  const { currentUser } = useAuth()
  console.log(usersPage.users);
  return (
    <>
      <SimpleGrid  mt="lg" cols={4} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
      {usersPage.users.map((item) => {
        return (
          <UserInfoAction
            currentUser={currentUser}
            id={item.id}
            avatar={item.avatar}
            name={item.name}
            email={item.email}
            verified={item.verified}
          />
        )
      })}
    </SimpleGrid>
    <Pagination count={usersPage.count} route="community" />
    </>
  )
}
