// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```jsx
// export const generated = (args) => {
//   return <Promte {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import Promte from './Promte'

export const generated = () => {
  return <Promte />
}

export default {
  title: 'Components/Promte',
  component: Promte,
}
