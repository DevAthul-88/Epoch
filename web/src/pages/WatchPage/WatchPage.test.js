import { render } from '@redwoodjs/testing/web'

import WatchPage from './WatchPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('WatchPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<WatchPage />)
    }).not.toThrow()
  })
})
