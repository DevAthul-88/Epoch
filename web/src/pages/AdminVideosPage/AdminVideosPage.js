import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import AdminVideosCell from 'src/components/AdminVideosCell/AdminVideosCell'

const AdminVideosPage = ({ page = 1 }) => {
  return (
    <>
      <MetaTags title="Videos" description="Admin Videos page" />

      <h1>Videos</h1>
      <AdminVideosCell page={page} />
    </>
  )
}

export default AdminVideosPage
