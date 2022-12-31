import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { Container, Title, Divider, Badge, Group, Tooltip } from '@mantine/core'
import Links from '../../mock/types'

const CategoriesPage = () => {
  return (
    <>
      <MetaTags title="Categories" description="Categories page" />
      <Container size="xl">
        <Title mt="lg">Categories</Title>
        <Divider mt="lg" mb="lg" />
        <Group>
          {Links.map((e) => {
            return (
              <Tooltip label={e.label}>
                <Link to={`/tag/${e.label}`}>
                  <Badge key={e.id} size="lg" color="indigo" variant='filled'>
                    {e.label}
                  </Badge>
                </Link>
              </Tooltip>
            )
          })}
        </Group>
      </Container>
    </>
  )
}

export default CategoriesPage
