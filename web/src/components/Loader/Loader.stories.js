// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```jsx
// export const generated = (args) => {
//   return <Loader {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import Loader from './Loader'

export const generated = () => {
  return <Loader />
}

export default {
  title: 'Components/Loader',
  component: Loader,
}
