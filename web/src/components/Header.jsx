import { useState } from 'react'

import {
  createStyles,
  Header,
  Container,
  Group,
  Burger,
  Paper,
  Transition,
  Menu,
  Button,
  TextInput,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import Logo from '../assets/logo.svg'
import { Link } from '@redwoodjs/router'
import { useAuth } from '@redwoodjs/auth'
import { IconSearch } from '@tabler/icons'

const HEADER_HEIGHT = 60

const useStyles = createStyles((theme) => ({
  root: {
    position: 'relative',
    zIndex: 1,
    backgroundColor: 'black',
    borderColor: 'transparent',

  },

  dropdown: {
    position: 'absolute',
    top: HEADER_HEIGHT,
    left: 0,
    right: 0,
    zIndex: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopWidth: 0,
    overflow: 'hidden',
    background:"black",
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
  },

  links: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },

  },

  burger: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
    background:"white",
    color:"white",
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: '8px 12px',
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color:theme.colors.gray[2],

    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    '&:hover': {
      color:theme.colors.dark[9],
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },

    [theme.fn.smallerThan('sm')]: {
      borderRadius: 0,
      padding: theme.spacing.md,
    },
  },

  linkActive: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({
        variant: 'light',
        color: theme.colors.gray[2],
      }).background,
      color: theme.colors.gray[8],
    },
  },
}))

export function Headers({ links }) {
  const [opened, { toggle, close }] = useDisclosure(false)
  const [active, setActive] = useState(links[0].link)
  const { classes, cx } = useStyles()
  const { isAuthenticated, currentUser, logOut } = useAuth()

  const items = links.map((link) => (
    <Link
      key={link.label}
      to={link.link}
      className={cx(classes.link)}
      activeClassName="activeLink"
    >
      {link.label}
    </Link>
  ))

  return (
    <Header height={HEADER_HEIGHT} className={classes.root}>
      <Container size={'xl'} className={classes.header}>
        <div>
          <Link to="/">
            <Logo />
          </Link>
        </div>

        <Group spacing={5} className={classes.links}>
          <form action="/search">
            <TextInput
              name="s"
              placeholder="Search videos"
              icon={<IconSearch />}
            />
          </form>
          {items}
          {isAuthenticated ? (
            <>
              <Menu shadow="md" width={200} closeDelay={400} withArrow>
                <Menu.Target>
                  <Button color="indigo">
                    {currentUser && currentUser.name}
                  </Button>
                </Menu.Target>
                <Menu.Dropdown>
                  <Link to="/profile" style={{ textDecoration: 'none' }}>
                    <Menu.Item>Profile</Menu.Item>
                  </Link>

                  <Link to="/upload" style={{ textDecoration: 'none' }}>
                    <Menu.Item> Upload</Menu.Item>
                  </Link>
                  {currentUser && currentUser.role === 'admin' && (
                    <Link to="/admin" style={{ textDecoration: 'none' }}>
                      <Menu.Item>Dashboard</Menu.Item>
                    </Link>
                  )}
                  <Link to="/studio" style={{ textDecoration: 'none' }}>
                    <Menu.Item>Studio</Menu.Item>
                  </Link>
                  <Menu.Divider />
                  <Menu.Item
                    color="indigo"
                    onClick={() => {
                      logOut()
                    }}
                  >
                    Logout
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </>
          ) : (
            <Link
              to="/signup"
              className={cx(classes.link, {
                [classes.linkActive]: active === 'signup',
              })}
            >
              Get started
            </Link>
          )}
        </Group>
        <Burger
          opened={opened}
          onClick={toggle}
          className={classes.burger}
          size="sm"
        />
        <Transition transition="pop-top-right" duration={200} mounted={opened}>
          {(styles) => (
            <Paper className={classes.dropdown} withBorder style={styles}>
              {items}
              {isAuthenticated ? (
                <>
                  <Menu shadow="md" width={200} closeDelay={400} withArrow>
                    <Menu.Target>
                      <Button color="indigo">
                        {currentUser && currentUser.name}
                      </Button>
                    </Menu.Target>
                    <Menu.Dropdown>
                      <Link to="/profile" style={{ textDecoration: 'none' }}>
                        <Menu.Item>Profile</Menu.Item>
                      </Link>

                      <Link to="/upload" style={{ textDecoration: 'none' }}>
                        <Menu.Item> Upload</Menu.Item>
                      </Link>
                      {currentUser && currentUser.role === 'admin' && (
                        <Link to="/admin" style={{ textDecoration: 'none' }}>
                          <Menu.Item>Dashboard</Menu.Item>
                        </Link>
                      )}
                      <Link to="/studio" style={{ textDecoration: 'none' }}>
                        <Menu.Item>Studio</Menu.Item>
                      </Link>
                      <Menu.Divider />
                      <Menu.Item
                        color="indigo"
                        onClick={() => {
                          logOut()
                        }}
                      >
                        Logout
                      </Menu.Item>
                    </Menu.Dropdown>
                  </Menu>
                </>
              ) : (
                <Link
                  to="/signup"
                  className={cx(classes.link, {
                    [classes.linkActive]: active === 'signup',
                  })}
                >
                  Get started
                </Link>
              )}
            </Paper>
          )}
        </Transition>
      </Container>
    </Header>
  )
}
