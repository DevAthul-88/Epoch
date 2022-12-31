import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import AdminUsersCell from 'src/components/AdminUsersCell/AdminUsersCell'


const UsersPage = ({page = 1}) => {
  return (
    <>
      <MetaTags title="Users" description="Users page" />

      <h1>Users</h1>
      <AdminUsersCell page={page}/>
    </>
  )
}

export default UsersPage
