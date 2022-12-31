import { render } from '@redwoodjs/testing/web'

import Unsubscribe from './Unsubscribe'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Unsubscribe', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Unsubscribe />)
    }).not.toThrow()
  })
})
