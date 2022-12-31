// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```jsx
// export const generated = (args) => {
//   return <Editvideo {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import Editvideo from './Editvideo'

export const generated = () => {
  return <Editvideo />
}

export default {
  title: 'Components/Editvideo',
  component: Editvideo,
}
