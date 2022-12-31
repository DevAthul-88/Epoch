import Dots from "../Dots/Dots"


export const QUERY = gql`
  query FindVideoQuery($id: Int!) {
    videos: videoByUser(id: $id) {
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

export const Loading = () => <Dots />

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ videos }) => {
  const views = videos.map((e) => {
    return e.views
  })
  const final = views.reduce((a , b) => {
    return a + b
  })
  return (
    <>{final}</>
  )
}
