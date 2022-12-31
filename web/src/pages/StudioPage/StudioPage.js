import { Container, Tabs, Title } from '@mantine/core'
import { useAuth } from '@redwoodjs/auth'
import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import Status from 'src/components/Status/Status'
import StudiovideosCell from 'src/components/StudiovideosCell/StudiovideosCell'


const StudioPage = () => {
  const { currentUser } = useAuth()
  return (
    <>
      <MetaTags title="Studio" description="Studio page" />

      <Container size="xl">
        <Title mt="lg">Studio</Title>
      </Container>
      <Tabs mt="lg" defaultValue="gallery" color="indigo">
        <Tabs.List grow>
          <Tabs.Tab value="gallery">Dashboard</Tabs.Tab>
          <Tabs.Tab value="messages">Videos</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="gallery" pt="xs">
          <Container size="xl" mt="lg">
            <Status />
          </Container>
        </Tabs.Panel>

        <Tabs.Panel value="messages" pt="xs">
          <Container size="xl" mt="lg" >
          <StudiovideosCell id={currentUser?.id} />
          </Container>
        </Tabs.Panel>
      </Tabs>
    </>
  )
}

export default StudioPage
