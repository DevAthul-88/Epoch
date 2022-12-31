import { Button } from "@mantine/core"
import { useAuth } from "@redwoodjs/auth"
import { useMutation } from "@redwoodjs/web"



const CREATE_SUBSCRIBE = gql`
  mutation CreateSubscribersMutation($input: CreateSubscribersInput!) {
    createSubscribers(input: $input) {
      authorId
      channel
    }
  }
`

const Subscribe = ({channel}) => {
  const {currentUser} = useAuth()
  const [create, { loading, error }] = useMutation(CREATE_SUBSCRIBE, {
    onCompleted: () => {
      window.location.reload();
    },
    onError: () => {
      toast.error(error.message)
    },
  })

  function subscribe(){
    const payload = {
      authorId:currentUser?.id,
      channel:channel,
    }
    create({ variables: { input: payload } })
  }
  return (
    <Button  color="indigo" style={{float: 'right'}} loading={loading} onClick={subscribe}>
      <strong>Subscribe</strong>
    </Button>
  )
}

export default Subscribe
