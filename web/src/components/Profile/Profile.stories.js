// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```jsx
// export const generated = (args) => {
//   return <Profile {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import Profile from './Profile'

export const generated = () => {
  return <Profile />
}

export default {
  title: 'Components/Profile',
  component: Profile,
}
