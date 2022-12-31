// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```jsx
// export const generated = (args) => {
//   return <Thumbnail {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import Thumbnail from './Thumbnail'

export const generated = () => {
  return <Thumbnail />
}

export default {
  title: 'Components/Thumbnail',
  component: Thumbnail,
}
