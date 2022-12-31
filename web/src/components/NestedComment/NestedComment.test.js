import { render } from '@redwoodjs/testing/web'

import NestedComment from './NestedComment'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('NestedComment', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<NestedComment />)
    }).not.toThrow()
  })
})
