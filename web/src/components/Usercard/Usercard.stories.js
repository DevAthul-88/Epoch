// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```jsx
// export const generated = (args) => {
//   return <Usercard {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import Usercard from './Usercard'

export const generated = () => {
  return <Usercard />
}

export default {
  title: 'Components/Usercard',
  component: Usercard,
}
