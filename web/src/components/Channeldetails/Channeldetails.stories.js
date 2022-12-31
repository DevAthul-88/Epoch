// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```jsx
// export const generated = (args) => {
//   return <Channeldetails {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import Channeldetails from './Channeldetails'

export const generated = () => {
  return <Channeldetails />
}

export default {
  title: 'Components/Channeldetails',
  component: Channeldetails,
}
