import Editvideo from "../Editvideo/Editvideo"
import Loaders from "../Loader/Loader"

export const QUERY = gql`
  query FindVideoQuery($id: Int!) {
    video: video(id: $id) {
      id
      url
      title
      thumbnail
      description
      views
      createdAt
      tags
      author {
        name
        avatar
        id
      }
    }
  }
`



export const Loading = () => <Loaders />

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ video , id }) => {
  return <Editvideo data={video} id={Number(id)} />
}
