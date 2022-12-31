import { render } from '@redwoodjs/testing/web'

import Nested from './Nested'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Nested', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Nested />)
    }).not.toThrow()
  })
})
