import { render } from '@redwoodjs/testing/web'

import Channeldetails from './Channeldetails'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Channeldetails', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Channeldetails />)
    }).not.toThrow()
  })
})
