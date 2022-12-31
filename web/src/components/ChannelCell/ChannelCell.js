import { Banner } from "../Banner/Banner"

export const QUERY = gql`
  query FindUserQuery($id: Int!) {
    user: user(id: $id) {
      id
      name
      about
      createdAt
      website
      other
      cover
      avatar
      verified
      email
    }
  }
`


export const Loading = () => null

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ user }) => {
  return <Banner User={user}/>
}
