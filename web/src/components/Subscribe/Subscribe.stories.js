// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```jsx
// export const generated = (args) => {
//   return <Subscribe {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import Subscribe from './Subscribe'

export const generated = () => {
  return <Subscribe />
}

export default {
  title: 'Components/Subscribe',
  component: Subscribe,
}
