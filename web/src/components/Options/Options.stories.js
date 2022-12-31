// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```jsx
// export const generated = (args) => {
//   return <Options {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import Options from './Options'

export const generated = () => {
  return <Options />
}

export default {
  title: 'Components/Options',
  component: Options,
}
