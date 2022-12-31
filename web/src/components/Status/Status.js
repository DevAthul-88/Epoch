import { Text, Paper , SimpleGrid } from '@mantine/core'
import { useAuth } from '@redwoodjs/auth'
import { format } from 'timeago.js'
import CountCell from '../CountCell/CountCell'
import ViewsCell from '../ViewsCell/ViewsCell'



const Status = () => {
  const {currentUser} = useAuth()
  return (
    <div>
    <SimpleGrid cols={4}>
      <Paper shadow="xs" p="md" withBorder>
        <Text fz="xl" fw="bold">Total Subscribers</Text>
        <Text mt="lg">
          <CountCell channel={currentUser?.id}/> Subscribers
        </Text>
      </Paper>
      <Paper shadow="xs" p="md" withBorder>
        <Text fz="xl" fw="bold">Total views</Text>
        <Text mt="lg">
          <ViewsCell id={Number(currentUser?.id)}/> Views
        </Text>
      </Paper>
      <Paper shadow="xs" p="md" withBorder>
        <Text fz="xl" fw="bold">Created At</Text>
        <Text mt="lg">
          {format(currentUser?.createdAt)}
        </Text>
      </Paper>
      <Paper shadow="xs" p="md" withBorder>
        <Text fz="xl" fw="bold">Updated At</Text>
        <Text mt="lg">
          {format(currentUser?.updatedAt)}
        </Text>
      </Paper>
      </SimpleGrid>
    </div>
  )
}

export default Status
