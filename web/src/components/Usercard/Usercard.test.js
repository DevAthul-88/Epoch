import { render } from '@redwoodjs/testing/web'

import Usercard from './Usercard'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Usercard', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Usercard />)
    }).not.toThrow()
  })
})
