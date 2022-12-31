import { render } from '@redwoodjs/testing/web'

import Options from './Options'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Options', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Options />)
    }).not.toThrow()
  })
})
