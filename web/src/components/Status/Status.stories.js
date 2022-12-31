// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```jsx
// export const generated = (args) => {
//   return <Status {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import Status from './Status'

export const generated = () => {
  return <Status />
}

export default {
  title: 'Components/Status',
  component: Status,
}
