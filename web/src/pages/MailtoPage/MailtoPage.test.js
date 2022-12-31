import { render } from '@redwoodjs/testing/web'

import MailtoPage from './MailtoPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('MailtoPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<MailtoPage />)
    }).not.toThrow()
  })
})
