// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```jsx
// export const generated = (args) => {
//   return <AdminUsersTable {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import AdminUsersTable from './AdminUsersTable'

export const generated = () => {
  return <AdminUsersTable />
}

export default {
  title: 'Components/AdminUsersTable',
  component: AdminUsersTable,
}
