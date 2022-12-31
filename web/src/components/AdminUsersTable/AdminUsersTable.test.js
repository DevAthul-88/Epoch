import { render } from '@redwoodjs/testing/web'

import AdminUsersTable from './AdminUsersTable'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('AdminUsersTable', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AdminUsersTable />)
    }).not.toThrow()
  })
})
