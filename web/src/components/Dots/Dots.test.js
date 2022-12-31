import { render } from '@redwoodjs/testing/web'

import Dots from './Dots'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Dots', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Dots />)
    }).not.toThrow()
  })
})
