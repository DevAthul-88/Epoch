import Subscribe from '../Subscribe/Subscribe'
import Unsubscribe from '../Unsubscribe/Unsubscribe'


export const QUERY = gql`
  query FindSubscribersQuery($authorId: Int!, $channel: Int!) {
    subscribers: subscribersCheck(authorId: $authorId, channel: $channel) {
      authorId
      channel
      id
    }
  }
`

export const Loading = () => null

export const Empty = ({ channel }) => <Subscribe channel={channel} />

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ subscribers }) => {
  return <Unsubscribe id={subscribers[0].id} />
}
