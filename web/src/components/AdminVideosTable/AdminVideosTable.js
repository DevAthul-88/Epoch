import { Box, Button, Checkbox, Grid, Text , TextInput } from '@mantine/core'
import { useDebouncedValue } from '@mantine/hooks'
import { IconSearch, IconHammer } from '@tabler/icons'
import dayjs from 'dayjs'
import { DataTable, DataTableSortStatus } from 'mantine-datatable'
import { useEffect, useState } from 'react'
import sortBy from 'lodash/sortBy'
import { Link } from '@redwoodjs/router'
import { format } from 'timeago.js'
import { useMutation } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/dist/toast'
import { openConfirmModal } from '@mantine/modals'

const DELETE_VIDEO_MUTATION = gql`
  mutation DeleteVideoMutation($id: Int!) {
    deleteVideo(id: $id) {
      id
    }
  }
`

export default function AdminVideosTable({ Videos }) {
  const [deleteVideo, { loading }] = useMutation(DELETE_VIDEO_MUTATION, {
    onCompleted: () => {
      window.location.reload()
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })
  const [records, setRecords] = useState(initialRecords)

  const [query, setQuery] = useState('')
  const [veteransOnly, setVeteransOnly] = useState(false)
  const [debouncedQuery] = useDebouncedValue(query, 200)
  const initialRecords = Videos.slice(0, 100)
  const [sortStatus, setSortStatus] = useState({
    columnAccessor: 'title',
    direction: 'asc',
  })

  useEffect(() => {
    const data = sortBy(Videos, sortStatus.columnAccessor)
    setRecords(sortStatus.direction === 'desc' ? data.reverse() : data)
  }, [sortStatus])

  useEffect(() => {
    const now = dayjs()
    setRecords(
      initialRecords.filter(
        ({ title, updatedAt, published, createdAt, id }) => {
          if (
            debouncedQuery !== '' &&
            !`${title}`
              .toLowerCase()
              .includes(debouncedQuery.trim().toLowerCase())
          ) {
            return false
          }
          return true
        }
      )
    )
  }, [debouncedQuery, veteransOnly])
  const deleteVideos = (id) =>
    openConfirmModal({
      title: 'Please confirm your action',
      centered: true,
      children: (
        <Text size="sm">Are you sure you want to delete this video?</Text>
      ),
      confirmProps: { color: 'red' },
      labels: { confirm: 'Confirm', cancel: 'Cancel' },
      onCancel: () => console.log('Cancel'),
      onConfirm: () => deleteVideo({ variables: { id: id } }),
    })
  return (
    <>
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      <Grid align="center" mb="md">
        <Grid.Col>
          <TextInput
            size="md"
            round="xl"
            sx={{ flexBasis: '60%' }}
            placeholder="Search videos...."
            icon={<IconSearch size={16} />}
            value={query}
            onChange={(e) => setQuery(e.currentTarget.value)}
          />
        </Grid.Col>
      </Grid>
      <Box sx={{ height: 300 }}>
        <DataTable
          withBorder
          withColumnBorders
          records={records}
          columns={[
            {
              accessor: 'title',
              sortable: true,
              render: ({ title, id }) => (
                <Link
                  to={`/watch/${id}`}
                  style={{ color: 'black', textDecoration: 'none' }}
                >
                  {title}
                </Link>
              ),
            },
            { accessor: 'published', sortable: true },
            {
              accessor: 'createdAt',
              sortable: true,
              render: ({ createdAt }) => format(createdAt),
            },
            {
              accessor: 'updatedAt',
              sortable: true,
              render: ({ updatedAt }) => format(updatedAt),
            },
            {
              accessor: 'Actions',
              render: ({ id }) => (
                <Button
                  leftIcon={<IconHammer />}
                  color="red"
                  onClick={() => {
                    deleteVideos(id)
                  }}
                >
                  <strong>Ban Video</strong>
                </Button>
              ),
            },
          ]}
          sortStatus={sortStatus}
          onSortStatusChange={setSortStatus}
        />
      </Box>
    </>
  )
}
