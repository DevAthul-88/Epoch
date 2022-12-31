import { Tabs, Container , Title , Divider , Button } from '@mantine/core'
import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import HomeCell from 'src/components/HomeCell/HomeCell'


const HomePage = () => {

  return (
    <>
      <MetaTags title="Home" description="Home page" />
      <Tabs defaultValue="home" color="indigo">
        <Tabs.List grow>
          <Tabs.Tab value="home">
            <strong>Home</strong>
          </Tabs.Tab>
          <Tabs.Tab value="second">
            <Link
              to="/tag/gaming"
              style={{ color: 'black', textDecoration: 'none' }}
            >
              <strong>Gaming</strong>
            </Link>
          </Tabs.Tab>
          <Tabs.Tab value="third">
            <Link
              to="/tag/sports"
              style={{ color: 'black', textDecoration: 'none' }}
            >
              <strong>Sports</strong>
            </Link>
          </Tabs.Tab>
          <Tabs.Tab value="third">
            <Link
              to="/tag/entertainment"
              style={{ color: 'black', textDecoration: 'none' }}
            >
              <strong>Entertainment</strong>
            </Link>
          </Tabs.Tab>
          <Tabs.Tab value="third">
            <Link
              to="/tag/music"
              style={{ color: 'black', textDecoration: 'none' }}
            >
              <strong>Music</strong>
            </Link>
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="home" mt="lg">
          <Container size="xl">
          <Title>Home</Title>
          <Divider mt="lg" />
          <HomeCell />
          <Link to="/explore">
          <Button mt="lg" color="indigo">
            <strong>See more</strong>
          </Button>
          </Link>
          </Container>
        </Tabs.Panel>
      </Tabs>
    </>
  )
}

export default HomePage
