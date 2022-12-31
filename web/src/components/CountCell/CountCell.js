import Dots from "../Dots/Dots"

export const QUERY = gql`
  query FindSubscribersQuery($channel: Int!) {
    count: subscribersCount(channel: $channel) {
      id
    }
  }
`



export const Loading = () => <Dots />

export const Empty = () => <>0</>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ count }) => {

  return <>{count.length}</>
}
