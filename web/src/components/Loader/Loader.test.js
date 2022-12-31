import { render } from '@redwoodjs/testing/web'

import Loader from './Loader'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Loader', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Loader />)
    }).not.toThrow()
  })
})
