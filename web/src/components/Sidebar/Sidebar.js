import { AppShell, Navbar, Header, Button } from '@mantine/core'
import { Link } from '@redwoodjs/router'
import { IconHomeInfinity , IconUsers , IconVideo , IconNews , IconFlag} from '@tabler/icons'


function Sidebar({ children }) {
  return (
    <AppShell
    fixed={false}
      padding="md"
      navbar={
        <Navbar width={{ base: 300 }} height={500} p="xs">
          <Link to='/admin' style={{textDecoration: 'none'}}>
            <Button color="indigo" leftIcon={<IconHomeInfinity />} variant="white" size="md">
            Dashboard
            </Button>
          </Link>
          <Link to='/admin/users'  style={{textDecoration: 'none'}}>
            <Button color="indigo" mt="sm" leftIcon={<IconUsers />} variant="white" size="md">
             Users
            </Button>
          </Link>
          <Link to='/admin/videos'  style={{textDecoration: 'none'}}>
            <Button color="indigo" mt="sm" leftIcon={<IconVideo />} variant="white" size="md">
              Videos
            </Button>
          </Link>
        </Navbar>
      }
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      {children}
    </AppShell>
  )
}

export default Sidebar
