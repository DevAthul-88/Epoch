// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```jsx
// export const generated = (args) => {
//   return <BanUser {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import BanUser from './BanUser'

export const generated = () => {
  return <BanUser />
}

export default {
  title: 'Components/BanUser',
  component: BanUser,
}
