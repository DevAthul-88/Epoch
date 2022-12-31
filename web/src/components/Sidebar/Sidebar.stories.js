// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```jsx
// export const generated = (args) => {
//   return <Sidebar {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import Sidebar from './Sidebar'

export const generated = () => {
  return <Sidebar />
}

export default {
  title: 'Components/Sidebar',
  component: Sidebar,
}
