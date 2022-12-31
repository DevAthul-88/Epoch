import { Container, Tabs } from '@mantine/core'
import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import ChannelCell from 'src/components/ChannelCell/ChannelCell'
import ChanneldataCell from 'src/components/ChanneldataCell/ChanneldataCell'
import YourCell from 'src/components/YourCell/YourCell'

const ChannelPage = ({ id }) => {
  return (
    <>
      <MetaTags title="Channel" description="Channel page" />
      <ChannelCell id={Number(id)} />
      <Tabs defaultValue="videos" color="indigo">
        <Tabs.List grow>
          <Tabs.Tab value="videos">Videos</Tabs.Tab>
          <Tabs.Tab value="about">About</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="videos" pt="xs">
          <Container size="xl">
            <YourCell id={Number(id)} title="Videos" />
          </Container>
        </Tabs.Panel>
        <Tabs.Panel value="about" pt="xs">
          <Container size="xl">
            <ChanneldataCell id={Number(id)} />
          </Container>
        </Tabs.Panel>
      </Tabs>
    </>
  )
}

export default ChannelPage
