import {
  createStyles,
  Card,
  Text,
  Group,
  Label,
  Button,
  Center,
  Tooltip
} from '@mantine/core'
import { useAuth } from '@redwoodjs/auth'
import { IconChecks } from '@tabler/icons'
import Avatar from 'react-avatar'
import CountCell from '../CountCell/CountCell'

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
  },

  avatar: {
    position: 'absolute',
    border: `2px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white
    }`,
  },
}))

export function StatsCard() {
  const { classes, theme } = useStyles()
  const { currentUser } = useAuth()

  return (
    <Card withBorder p="xl" className={classes.card}>
      <Card.Section
        sx={{
          backgroundImage: `url(${
            currentUser?.cover
              ? currentUser?.cover
              : 'https://img.freepik.com/free-vector/quote-blog-banner-template-editable-inspirational-message-no-rain-no-flowers-vector_53876-144728.jpg?w=2000'
          })`,
          height: 200,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Center>
        {currentUser?.avatar === null ? (
          <Avatar
            round={true}
            name={currentUser?.name}
            className={classes.avatar}
          />
        ) : (
          <Avatar
            round={true}
            name={currentUser?.name}
            src={currentUser?.avatar}
            className={classes.avatar}
          />
        )}
      </Center>
      <br />
      <br />
      {currentUser?.verified ? (
        <Tooltip label="Verified">
          <Text align="center" mt="xl" size="lg" weight={900}>
            {currentUser?.name}{' '}
            {currentUser.verified && (
              <IconChecks size={20} style={{ color: 'green' }} />
            )}
          </Text>
        </Tooltip>
      ) : (
        <Text align="center" mt="xl" size="lg" weight={900}>
          {currentUser?.name}
        </Text>
      )}
      <Group mt="md" position="center" spacing={30}>
        <CountCell channel={currentUser?.id} /> Subscribers
      </Group>
    </Card>
  )
}
