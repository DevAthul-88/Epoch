import { render } from '@redwoodjs/testing/web'

import BanUser from './BanUser'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('BanUser', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<BanUser />)
    }).not.toThrow()
  })
})
