import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import EditinputCell from 'src/components/EditinputCell/EditinputCell'

const EditPage = ({ id }) => {
  return (
    <>
      <MetaTags title="Edit" description="Edit page" />
      <EditinputCell id={Number(id)} />
    </>
  )
}

export default EditPage
