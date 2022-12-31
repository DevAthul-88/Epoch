import { render } from '@redwoodjs/testing/web'

import UploadPage from './UploadPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('UploadPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<UploadPage />)
    }).not.toThrow()
  })
})
