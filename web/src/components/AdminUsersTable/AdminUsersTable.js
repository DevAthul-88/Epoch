import {
  Box,
  Button,
  Checkbox,
  Menu,
  Text,
  Grid,
  TextInput,
} from '@mantine/core'
import { useDebouncedValue } from '@mantine/hooks'
import {
  IconSearch,
  IconHammer,
  IconCheck,
  IconMail,
  IconArrowBackUp,
  IconArrowBarDown,
} from '@tabler/icons'
import dayjs from 'dayjs'
import { DataTable, DataTableSortStatus } from 'mantine-datatable'
import { useEffect, useState } from 'react'
import sortBy from 'lodash/sortBy'
import { format } from 'timeago.js'
import { openConfirmModal } from '@mantine/modals'
import { useMutation } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/dist/toast'
import BanUser from '../BanUser/BanUser'
import Promote from '../Promte/Promte'





const UPDATE_PROFILE = gql`
  mutation VerifyUserMutation($id: Int!) {
    verifyUser(id: $id) {
      id
    }
  }
`

export default function AdminUsersTable({ Users }) {

  const [create, { loading, error }] = useMutation(UPDATE_PROFILE, {
    onCompleted: () => {
      window.location.reload()
    },
    onError: () => {
      toast.error(error.message)
    },
  })
  const [records, setRecords] = useState(initialRecords)

  const [query, setQuery] = useState('')
  const [veteransOnly, setVeteransOnly] = useState(false)
  const [debouncedQuery] = useDebouncedValue(query, 200)
  const initialRecords = Users.slice(0, 100)
  const [sortStatus, setSortStatus] = useState({
    columnAccessor: 'name',
    direction: 'asc',
  })

  useEffect(() => {
    const data = sortBy(Users, sortStatus.columnAccessor)
    setRecords(sortStatus.direction === 'desc' ? data.reverse() : data)
  }, [sortStatus])

  useEffect(() => {
    const now = dayjs()
    setRecords(
      initialRecords.filter(({ name, email, role, createdAt }) => {
        if (veteransOnly && role === 'admin') {
          return false
        }
        if (
          debouncedQuery !== '' &&
          !`${name} ${email}`
            .toLowerCase()
            .includes(debouncedQuery.trim().toLowerCase())
        ) {
          return false
        }
        return true
      })
    )
  }, [debouncedQuery, veteransOnly])

  function verifyUser(id) {
    openConfirmModal({
      title: 'Verify user',
      centered: true,
      children: (
        <Text size="sm">Are you sure you want to verify this user?</Text>
      ),
      labels: { confirm: 'Verify user', cancel: "No don't do it" },
      confirmProps: { color: 'green' },
      onCancel: () => console.log('Cancel'),
      onConfirm: () => create({ variables: { id: id } }),
    })
  }

  return (
    <>
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      <Grid align="center" mb="md">
        <Grid.Col>
          <TextInput
            size="md"
            round="xl"
            sx={{ flexBasis: '60%' }}
            placeholder="Search users...."
            icon={<IconSearch size={16} />}
            value={query}
            onChange={(e) => setQuery(e.currentTarget.value)}
          />
        </Grid.Col>
      </Grid>
      <Box sx={{ height: 500 }}>
        <DataTable
          withBorder
          withColumnBorders
          records={records}
          columns={[
            {
              accessor: 'name',
              sortable: true,
              render: ({ name }) => `${name}`,
            },
            { accessor: 'email', sortable: true },
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
              render: ({ id , verified , email}) => (
                <Menu shadow="md" width={200} position="top" withArrow>
                  <Menu.Target>
                    <Button
                      variant="outline"
                      color="indigo"
                      rightIcon={<IconArrowBarDown />}
                      loading={loading}
                    >
                      <strong>Actions</strong>
                    </Button>
                  </Menu.Target>

                  <Menu.Dropdown style={{ zIndex: '99999' }}>
                    <Menu.Label>Application</Menu.Label>
                    <Promote id={Number(id)} />
                    {verified ? <Menu.Item
                      icon={<IconCheck size={14} />}
                      disabled={true}
                    >
                      Verified
                    </Menu.Item> : <Menu.Item
                      icon={<IconCheck size={14} />}
                      onClick={() => {
                        verifyUser(id)
                      }}
                    >
                      Verify User
                    </Menu.Item>}
                    <Menu.Divider />
                    <Menu.Label>Danger zone</Menu.Label>
                    <BanUser id={Number(id)} email={email}/>
                  </Menu.Dropdown>
                </Menu>
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
