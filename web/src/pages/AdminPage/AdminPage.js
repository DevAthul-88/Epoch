import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { Text, Paper, SimpleGrid } from '@mantine/core'
import TotousersCell from 'src/components/TotousersCell/TotousersCell'
import TotalVideosCell from 'src/components/TotalVideosCell/TotalVideosCell'

const AdminPage = () => {
  return (
    <>
      <MetaTags title="Admin" description="Admin page" />

      <h1>Dashboard</h1>
      <div>
        <SimpleGrid cols={2}>
          <Paper shadow="xs" p="md" withBorder>
            <Text fz="xl" fw="bold">
              Total Users
            </Text>
            <Text mt="lg">
              <TotousersCell /> Users
            </Text>
          </Paper>
          <Paper shadow="xs" p="md" withBorder>
            <Text fz="xl" fw="bold">
              Total Videos
            </Text>
            <Text mt="lg">
              <TotalVideosCell /> Videos
            </Text>
          </Paper>
        </SimpleGrid>
      </div>
    </>
  )
}

export default AdminPage
