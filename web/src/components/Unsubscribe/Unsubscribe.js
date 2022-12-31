import { Button } from "@mantine/core"
import { useAuth } from "@redwoodjs/auth"
import { useMutation } from "@redwoodjs/web"



const DELETE_SUB_MUTATION = gql`
  mutation DeleteSubscribersMutation($id : Int!) {
    deleteSubscribers(id: $id) {
      authorId
      channel
    }
  }
`

const Unsubscribe = ({id}) => {
  const {currentUser} = useAuth()
  const [deleteSubscribers, { loading, error }] = useMutation(DELETE_SUB_MUTATION, {
    onCompleted: () => {
      window.location.reload();
    },
    onError: () => {
      toast.error(error.message)
    },
  })

  function subscribe(){

    deleteSubscribers({ variables: { id:id } })
  }
  return (
    <Button  color="red" style={{float: 'right'}} loading={loading} onClick={subscribe}>
      <strong>Unsubscribe</strong>
    </Button>
  )
}

export default Unsubscribe
