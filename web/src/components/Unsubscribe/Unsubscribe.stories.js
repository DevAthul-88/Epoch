// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```jsx
// export const generated = (args) => {
//   return <Unsubscribe {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import Unsubscribe from './Unsubscribe'

export const generated = () => {
  return <Unsubscribe />
}

export default {
  title: 'Components/Unsubscribe',
  component: Unsubscribe,
}
