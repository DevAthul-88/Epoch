import { render } from '@redwoodjs/testing/web'

import Editvideo from './Editvideo'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Editvideo', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Editvideo />)
    }).not.toThrow()
  })
})
