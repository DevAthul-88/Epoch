import { render } from '@redwoodjs/testing/web'

import AdminVideosTable from './AdminVideosTable'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('AdminVideosTable', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AdminVideosTable />)
    }).not.toThrow()
  })
})
