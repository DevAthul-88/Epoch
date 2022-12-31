import Dots from "../Dots/Dots"

export const QUERY = gql`
  query usersQuery {
    usersAll {
      id
    }
  }
`


export const Loading = () => <Dots />

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ usersAll  }) => {
  return (
     <>
      {usersAll.length}
     </>
  )
}
