import { render } from '@redwoodjs/testing/web'

import StudioPage from './StudioPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('StudioPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<StudioPage />)
    }).not.toThrow()
  })
})
