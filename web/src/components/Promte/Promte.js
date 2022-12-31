import { Menu , Text } from '@mantine/core'
import { openConfirmModal } from '@mantine/modals'
import { useMutation } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/dist/toast'
import { IconArrowBackUp } from '@tabler/icons'


const UPDATE_PROFILE = gql`
  mutation PromoteUserMutation($id: Int!) {
    promoteUser(id: $id) {
      id
    }
  }
`

const Promote = ({id}) => {
  const [create, { loading, error }] = useMutation(UPDATE_PROFILE, {
    onCompleted: () => {
      window.location.reload()
    },
    onError: () => {
      toast.error(error.message)
    },
  })
  function promoteUser() {
    openConfirmModal({
      title: 'Verify user',
      centered: true,
      children: (
        <Text size="sm">
          Are you sure you want to promote this user to admin?
        </Text>
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
      <Menu.Item icon={<IconArrowBackUp size={14} />} onClick={promoteUser}>Promote User</Menu.Item>
    </>
  )
}

export default Promote
