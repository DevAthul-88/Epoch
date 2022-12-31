import Loaders from '../Loader/Loader'
import { createStyles, Card, Image,  Text, Group } from '@mantine/core'
import { format } from 'timeago.js'
import Thumbnail from '../Thumbnail/Thumbnail'
import { Link, useParams } from '@redwoodjs/router'
import Avatar from 'react-avatar'


export const QUERY = gql`
  query FindVideosQuery($tag: String!) {
    videostagSimilar: videostagSimilar(tag: $tag) {
      id
      title
      description
      views
      url
      thumbnail
      authorId
      createdAt
      author {
        name
        avatar
        id
      }
    }
  }
`

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
  },

  title: {
    fontWeight: 700,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    lineHeight: 1.2,
  },

  body: {
    padding: theme.spacing.md,
  },
}))

export const Loading = () => <Loaders />

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ videostagSimilar }) => {
  const { classes } = useStyles()
  const { id } = useParams()
  return (
    <>
      {videostagSimilar.map((e) => {
        return (
          <Card withBorder radius="md" mt="lg" p={0} className={classes.card}>
            <Group noWrap spacing={0}>
              <div className="image">
                {e.thumbnail !== null ? (
                  <Image src={e.thumbnail} height={140} width={140} />
                ) : (
                  <Thumbnail url={e.url} height={140} width={140} />
                )}
              </div>
              <div className={classes.body}>
                <Link
                  to={`/watch/${e.id}`}
                  style={{ color: 'black', textDecoration: 'none' }}
                >
                  <Text
                    className={classes.title}
                    mt="xs"
                    mb="md"
                    color={id == e.id ? 'indigo' : 'black'}
                  >
                    {e.title}
                  </Text>
                </Link>

                <Group noWrap spacing="xs">
                  <Group spacing="xs" noWrap>
                    {e.author.avatar === null ? (
                      <Avatar
                        size="20"
                        round={true}
                        name={e.author.name}
                      />
                    ) : (
                      <Avatar
                        size="20"
                        round={true}
                        name={e.author.name}
                        src={e.author.avatar}
                      />
                    )}
                    <Text size="xs">{e.author.name}</Text>
                  </Group>
                  <Text size="xs" color="dimmed">
                    •
                  </Text>
                  <Text size="xs" color="dimmed">
                    {format(e.createdAt)}
                  </Text>
                </Group>
              </div>
            </Group>
          </Card>
        )
      })}
    </>
  )
}
