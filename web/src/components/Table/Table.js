import { useState } from 'react'
import {
  createStyles,
  Table,
  ScrollArea,
  UnstyledButton,
  Group,
  Text,
  Center,
  TextInput,
  Button,
} from '@mantine/core'
import { keys } from '@mantine/utils'
import {
  IconSelector,
  IconChevronDown,
  IconChevronUp,
  IconSearch,
} from '@tabler/icons'
import { Link } from '@redwoodjs/router'
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

const useStyles = createStyles((theme) => ({
  th: {
    padding: '0 !important',
  },

  control: {
    width: '100%',
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },

  icon: {
    width: 21,
    height: 21,
    borderRadius: 21,
  },
}))

function Th({ children, reversed, sorted, onSort }) {
  const { classes } = useStyles()
  const Icon = sorted
    ? reversed
      ? IconChevronUp
      : IconChevronDown
    : IconSelector
  return (
    <th className={classes.th}>
      <UnstyledButton onClick={onSort} className={classes.control}>
        <Group position="apart">
          <Text weight={500} size="sm">
            {children}
          </Text>
          <Center className={classes.icon}>
            <Icon size={14} stroke={1.5} />
          </Center>
        </Group>
      </UnstyledButton>
    </th>
  )
}

function filterData(data, search) {
  const query = search.toLowerCase().trim()
  return data.filter((item) =>
    keys(data[0]).some((key) => item[key].toLowerCase().includes(query))
  )
}

function sortData(data = [], payload = { sortBy, reversed, search }) {
  const { sortBy } = payload

  if (!sortBy) {
    return filterData(data, payload.search)
  }

  return filterData(
    [...data].sort((a, b) => {
      if (payload.reversed) {
        return b[sortBy].localeCompare(a[sortBy])
      }

      return a[sortBy].localeCompare(b[sortBy])
    }),
    payload.search
  )
}

export function TableSort({ data }) {
  const [deleteVideo, { loading }] = useMutation(DELETE_VIDEO_MUTATION, {
    onCompleted: () => {
      window.location.reload()
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })
  const [search, setSearch] = useState('')
  const [sortedData, setSortedData] = useState(data)
  const [sortBy, setSortBy] = useState(null)
  const [reverseSortDirection, setReverseSortDirection] = useState(false)

  const setSorting = (field) => {
    const reversed = field === sortBy ? !reverseSortDirection : false
    setReverseSortDirection(reversed)
    setSortBy(field)
    setSortedData(sortData(data, { sortBy: field, reversed, search }))
  }

  const handleSearchChange = (event) => {
    const { value } = event.currentTarget
    setSearch(value)
    setSortedData(
      sortData(data, { sortBy, reversed: reverseSortDirection, search: value })
    )
  }
  function startDelete(id) {
    if (typeof id === 'number') {
      deleteVideo({ variables: { id } })
    } else {
      toast.error('Something went wrong when deleting comment!')
    }
  }
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
      onConfirm: () => startDelete(Number(id)),
    })

  const rows = sortedData.map((row) => (
    <tr key={row.name}>
      <td>
        <Link
          to={`/watch/${row.id}`}
          style={{ textDecoration: 'none', color: 'black' }}
        >
          {row.title}
        </Link>
      </td>
      <td>{row.published}</td>
      <td>{row.createdAt}</td>
      <td>{row.updatedAt}</td>
      <td>
        <Link to={`/edit/${row.id}`}>
          <Button color="yellow">
            <strong>Edit</strong>
          </Button>
        </Link>
      </td>
      <td>
        <Button
          color="red"
          onClick={() => {
            deleteVideos(Number(row.id))
          }}
          loading={loading}
        >
          <strong>Delete</strong>
        </Button>
      </td>
    </tr>
  ))

  return (
    <>
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      <ScrollArea>
        <TextInput
          placeholder="Search by any field"
          mb="md"
          radius="md"
          size="md"
          icon={<IconSearch size={14} stroke={1.5} />}
          value={search}
          onChange={handleSearchChange}
        />
        <Table
          horizontalSpacing="md"
          verticalSpacing="xs"
          sx={{ tableLayout: 'fixed', minWidth: 700 }}
          striped
          highlightOnHover
          withBorder
          withColumnBorders
        >
          <thead>
            <tr>
              <Th
                sorted={sortBy === 'title'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('title')}
              >
                Name
              </Th>
              <Th
                sorted={sortBy === 'published'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('published')}
              >
                Status
              </Th>
              <Th
                sorted={sortBy === 'createdAt'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('createdAt')}
              >
                Created At
              </Th>
              <Th
                sorted={sortBy === 'updatedAt'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('updatedAt')}
              >
                Updated At
              </Th>
              <Th></Th>
              <Th></Th>
            </tr>
          </thead>
          <tbody>
            {rows.length > 0 ? (
              rows
            ) : (
              <tr>
                <td colSpan={Object.keys(data[0]).length}>
                  <Text weight={500} align="center">
                    Nothing found
                  </Text>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </ScrollArea>
    </>
  )
}
