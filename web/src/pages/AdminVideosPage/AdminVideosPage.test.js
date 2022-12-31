import { render } from '@redwoodjs/testing/web'

import AdminVideosPage from './AdminVideosPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('AdminVideosPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AdminVideosPage />)
    }).not.toThrow()
  })
})
