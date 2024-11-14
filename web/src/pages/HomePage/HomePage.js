import { Tabs, Container , Title , Divider , Button } from '@mantine/core'
import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import HomeCell from 'src/components/HomeCell/HomeCell'


const HomePage = () => {

  return (
    <>
      <MetaTags title="Home" description="Home page" />


      <Tabs defaultValue="home" color="indigo">
      <Tabs.List grow style={{ display: 'flex' }}>
        <Tabs.Tab value="home" style={{ flex: 1, textAlign: 'center', fontSize: '14px' }}>
          <strong>Home</strong>
        </Tabs.Tab>

        {/* Convert other tabs into styled links with equal width and font size of 14px */}
        <Link
          to="/tag/gaming"
          style={{
            color: 'black',
            textDecoration: 'none',
            padding: '0.5rem 1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
            fontSize: '14px',  // Set font size here
          }}
        >
          <strong>Gaming</strong>
        </Link>
        <Link
          to="/tag/sports"
          style={{
            color: 'black',
            textDecoration: 'none',
            padding: '0.5rem 1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
            fontSize: '14px',  // Set font size here
          }}
        >
          <strong>Sports</strong>
        </Link>
        <Link
          to="/tag/entertainment"
          style={{
            color: 'black',
            textDecoration: 'none',
            padding: '0.5rem 1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
            fontSize: '14px',  // Set font size here
          }}
        >
          <strong>Entertainment</strong>
        </Link>
        <Link
          to="/tag/music"
          style={{
            color: 'black',
            textDecoration: 'none',
            padding: '0.5rem 1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
            fontSize: '14px',  // Set font size here
          }}
        >
          <strong>Music</strong>
        </Link>
      </Tabs.List>

      {/* Panel only for the "Home" tab */}
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
