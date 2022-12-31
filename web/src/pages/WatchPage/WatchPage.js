import { useAuth } from '@redwoodjs/auth'
import { Link, routes } from '@redwoodjs/router'
import { MetaTags, useMutation } from '@redwoodjs/web'
import { useEffect } from 'react'
import VideoCell from 'src/components/VideoCell/VideoCell'

const UPDATE_VIEW = gql`
  mutation UpdateVideoMutation($id: Int!) {
    updateVideoView(id: $id) {
      id
    }
  }
`
const WatchPage = ({ id, page = 1 }) => {
  const [create] = useMutation(UPDATE_VIEW)

  useEffect(() => {
    create({ variables: { id: Number(id) } })
  }, [id])

  return (
    <>
      <MetaTags title="Watch" description="Watch page" />

      <VideoCell id={Number(id)} page={page} />
    </>
  )
}

export default WatchPage
