import { render } from '@redwoodjs/testing/web'

import Promte from './Promte'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Promte', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Promte />)
    }).not.toThrow()
  })
})
