import { render } from '@redwoodjs/testing/web'

import Status from './Status'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Status', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Status />)
    }).not.toThrow()
  })
})
