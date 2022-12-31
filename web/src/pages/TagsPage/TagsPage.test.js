import { render } from '@redwoodjs/testing/web'

import TagsPage from './TagsPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('TagsPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<TagsPage />)
    }).not.toThrow()
  })
})
