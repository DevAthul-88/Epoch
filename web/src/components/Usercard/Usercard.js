import { Center, Text, Button, Paper, Tooltip } from '@mantine/core'
import { Link } from '@redwoodjs/router'
import { IconChecks } from '@tabler/icons'
import Avatar from 'react-avatar'

export function UserInfoAction({
  id,
  verified,
  currentUser,
  avatar,
  name,
  email,
}) {
  return (
    <Paper
      radius="md"
      withBorder
      p="lg"
      sx={(theme) => ({
        backgroundColor:
          theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
      })}
    >
      <Center>
        <Avatar round={true} name={name} src={avatar} size={100} />
      </Center>
      <Text align="center" size="lg" weight={500} mt="md">
        {verified ? (
          <Tooltip label={verified && 'Verified'}>
            <Link
              color="black"
              style={{ textDecoration: 'none', color: 'black' }}
              to={id == currentUser?.id ? '/profile' : `/channel/${id}`}
            >
              {name}{' '}
              {verified && <IconChecks size={20} style={{ color: 'green' }} />}
            </Link>
          </Tooltip>
        ) : (
          <Link
            color="black"
            style={{ textDecoration: 'none', color: 'black' }}
            to={id == currentUser?.id ? '/profile' : `/channel/${id}`}
          >
            {name}{' '}
            {verified && <IconChecks size={20} style={{ color: 'green' }} />}
          </Link>
        )}
      </Text>
      <Text align="center" color="dimmed" size="sm">
        {email}
      </Text>
    </Paper>
  )
}
