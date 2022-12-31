// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```jsx
// export const generated = (args) => {
//   return <Dots {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import Dots from './Dots'

export const generated = () => {
  return <Dots />
}

export default {
  title: 'Components/Dots',
  component: Dots,
}
