import Loaders from "../Loader/Loader"
import {TableSort} from "../Table/Table"


export const QUERY = gql`
  query FindVideoQuery($id: Int!) {
    videos: videoByUser(id: $id) {
      id
      url
      title
      thumbnail
      description
      views
      published
      updatedAt
      createdAt
      tags
    }
  }
`

export const Loading = () => <Loaders />

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ videos }) => {
  return (
     <TableSort data={videos}/>
  )
}
