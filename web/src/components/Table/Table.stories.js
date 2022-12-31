// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```jsx
// export const generated = (args) => {
//   return <Table {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import Table from './Table'

export const generated = () => {
  return <Table />
}

export default {
  title: 'Components/Table',
  component: Table,
}
