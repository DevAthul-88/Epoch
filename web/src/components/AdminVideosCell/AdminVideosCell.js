import AdminVideosTable from "../AdminVideosTable/AdminVideosTable"
import Loaders from "../Loader/Loader"


export const QUERY = gql`
query VideosQuery($page: Int) {
  videosPage(page: $page) {
    videos {
      id
      title
      description
      views
      url
      thumbnail
      authorId
      published
      createdAt
      updatedAt
      author {
        name
        avatar
        id
      }
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

export const Success = ({ videosPage }) => {
  return (
     <AdminVideosTable Videos={videosPage.videos}/>
  )
}
