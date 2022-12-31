import { Link, routes } from '@redwoodjs/router'
import { Group, Button, Divider } from '@mantine/core'

const POSTS_PER_PAGE = 5

const Pagination = ({ count, route }) => {
  const items = []

  for (let i = 0; i < Math.ceil(count / POSTS_PER_PAGE); i++) {
    items.push(
      <Link
        key={i}
        to={`/${route}?page=${i + 1}`}
        onClick={(e) => {
          e.preventDefault()
        }}
      >
        <Button variant="outline">{i + 1}</Button>{' '}
      </Link>
    )
  }

  return (
    <>
      <Group mt="xl">{items}</Group>
    </>
  )
}

export default Pagination
