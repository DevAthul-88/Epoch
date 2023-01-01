import { createStyles, Card, Text, Group, Button, Center , Tooltip } from '@mantine/core'
import { useAuth } from '@redwoodjs/auth'
import Avatar from 'react-avatar'
import CountCell from '../CountCell/CountCell'
import SubscribecheckCell from '../SubscribecheckCell/SubscribecheckCell'
import { IconChecks, IconHomeDollar, IconMail } from '@tabler/icons'
import { Link } from '@redwoodjs/router'


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

export function Banner({ User }) {
  const { classes, theme } = useStyles()
  const {isAuthenticated , currentUser} = useAuth();
  return (
    <Card withBorder p="xl" className={classes.card}>
      <Card.Section
        sx={{
          backgroundImage: `url(${User?.cover ? User?.cover : 'https://img.freepik.com/free-vector/quote-blog-banner-template-editable-inspirational-message-no-rain-no-flowers-vector_53876-144728.jpg?w=2000'})`,
          height: 200,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Center>
        {User?.avatar === null ? (
          <Avatar round={true} name={User?.name} className={classes.avatar} />
        ) : (
          <Avatar
            round={true}
            name={User?.name}
            src={User?.avatar}
            className={classes.avatar}
          />
        )}
      </Center>
      <br />
      <br />
      {User?.verified ? (
        <Tooltip label="Verified">
          <Text align="center" mt="xl" size="lg" weight={900}>
            {User?.name}{' '}
            {User.verified && (
              <IconChecks size={20} style={{ color: 'green' }} />
            )}
          </Text>
        </Tooltip>
      ) : (
        <Text align="center" mt="xl" size="lg" weight={900}>
          {User?.name}
        </Text>
      )}
      <Group mt="md" position="center" spacing={30}>
        <CountCell channel={User?.id} /> Subscribers
      </Group>
      <Group mt="lg">
      {isAuthenticated && (
        <>
          {currentUser?.id !== User.id ? (
            <SubscribecheckCell authorId={currentUser?.id} channel={User?.id} />
          ) : null}
        </>
      )}
      </Group>
    </Card>
  )
}
