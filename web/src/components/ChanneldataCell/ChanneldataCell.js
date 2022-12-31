import { Loader } from "@mantine/core"
import Channeldetails from "../Channeldetails/Channeldetails"


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
    }
  }
`


export const Loading = () => <Loader />

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ user }) => {
  return <Channeldetails User={user}/>
}
