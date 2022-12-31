import { render } from '@redwoodjs/testing/web'

import CommunityPage from './CommunityPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('CommunityPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CommunityPage />)
    }).not.toThrow()
  })
})
