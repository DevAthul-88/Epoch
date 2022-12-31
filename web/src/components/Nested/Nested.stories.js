// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```jsx
// export const generated = (args) => {
//   return <Nested {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import Nested from './Nested'

export const generated = () => {
  return <Nested />
}

export default {
  title: 'Components/Nested',
  component: Nested,
}
