import {
  createStyles,
  SimpleGrid,
  Card,
  Image,
  Text,
  Divider,
  Title,
  Group,
} from '@mantine/core'
import { Link } from '@redwoodjs/router'
import { format } from 'timeago.js'
import Avatar from 'react-avatar'
import Loaders from '../Loader/Loader'
import Thumbnail from '../Thumbnail/Thumbnail'


export const QUERY = gql`
  query FindVideosQuery($s: String!) {
    videossearch: videossearch(s: $s) {
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
export const Loading = () => <Loaders />

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)
const useStyles = createStyles((theme) => ({
  card: {
    transition: 'transform 150ms ease, box-shadow 150ms ease',

    '&:hover': {
      transform: 'scale(1.01)',
      boxShadow: theme.shadows.sm,
    },
    border: '1px solid' + theme.colors.gray[2],
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 600,
  },
  link: {
    textDecoration: 'none',
    color: theme.colors.gray[9],
  },
}))

export const Success = ({ videossearch }) => {
  const { classes } = useStyles()
  return (
    <SimpleGrid mt="lg" cols={4} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
      {videossearch.map((article) => {
        return (
          <Card
            withBorder
            key={article.id}
            p="md"
            radius="md"
            className={classes.card}
          >
              <div className="image">
              {article.thumbnail ? (
                <img src={article.thumbnail} />
              ) : (
                <Thumbnail url={article.url} />
              )}
            </div>

            <Group mt="md" spacing="md">
              <Text fz="xl" className={classes.title} mt={5}>
                <Link to={`/watch/${article.id}`} className={classes.link}>
                  {article.title}
                </Link>
              </Text>
            </Group>
            <Group mt="md">
              {article.author.avatar === null ? (
                <Avatar size="40" round={true} name={article.author.name} />
              ) : (
                <Avatar
                  size="40"
                  round={true}
                  name={article.author.name}
                  src={article.author.avatar}
                />
              )}
              <Text size="xs" transform="uppercase" weight={700} mt="md">
                {article.views} views
              </Text>
              <Text size="xs" transform="uppercase" weight={700} mt="md">
                {format(article.createdAt)}
              </Text>
            </Group>
          </Card>
        )
      })}
    </SimpleGrid>
  )
}
