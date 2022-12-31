// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```jsx
// export const generated = (args) => {
//   return <NestedComment {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import NestedComment from './NestedComment'

export const generated = () => {
  return <NestedComment />
}

export default {
  title: 'Components/NestedComment',
  component: NestedComment,
}
