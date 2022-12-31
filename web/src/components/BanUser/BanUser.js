import { Menu, Text } from '@mantine/core'
import { openConfirmModal } from '@mantine/modals'
import { useAuth } from '@redwoodjs/auth'
import { useMutation } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/dist/toast'
import { IconHammer } from '@tabler/icons'

const DELETE_USER_MUTATION = gql`
  mutation DeleteUserMutation($id: Int!, $email: String!) {
    deleteUser(id: $id, email: $email) {
      id
      email
    }
  }
`

const BanUser = ({ id, email }) => {
  const { currentUser } = useAuth()
  const [deleteUser, { loading }] = useMutation(DELETE_USER_MUTATION, {
    onCompleted: () => {
      window.location.reload()
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })
  const deleteUsers = () =>
    openConfirmModal({
      title: 'Please confirm your action',
      centered: true,
      children: (
        <Text size="sm">Are you sure you want to delete this user?</Text>
      ),
      confirmProps: { color: 'red' },
      labels: { confirm: 'Confirm', cancel: 'Cancel' },
      onCancel: () => console.log('Cancel'),
      onConfirm: () => deleteUser({ variables: { id: id, email: email } }),
    })
  return (
    <>
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      <Menu.Item
        color="red"
        icon={<IconHammer size={14} />}
        onClick={() => {
          deleteUsers()
        }}
        disabled={currentUser?.id === id ? true : false}
      >
        Ban User
      </Menu.Item>
    </>
  )
}

export default BanUser
