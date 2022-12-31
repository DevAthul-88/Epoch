import {
  Container,
  Grid,
  Box,
  Title,
  Group,
  Text,
  createStyles,
  Button,
  Accordion,
  Badge,
  Divider,
  Rating,
  Tooltip,
  SimpleGrid,
  Tabs,
} from '@mantine/core'
import {
  Player,
  LoadingSpinner,
  ControlBar,
  ReplayControl,
  ForwardControl,
  CurrentTimeDisplay,
  TimeDivider,
  PlaybackRateMenuButton,
  VolumeMenuButton,
} from 'video-react'
import Avatar from 'react-avatar'
import { Link } from '@redwoodjs/router'
import { format } from 'timeago.js'
import CommentForm from '../CommentForm'
import { useAuth } from '@redwoodjs/auth'
import CommentsCell from '../CommentsCell/CommentsCell'
import { useState } from 'react'
import Loaders from '../Loader/Loader'
import SubscribecheckCell from '../SubscribecheckCell/SubscribecheckCell'
import CountCell from '../CountCell/CountCell'
import SimilarCell from '../SimilarCell/SimilarCell'
import { IconArrowBarDown, IconArrowBarUp } from '@tabler/icons'
import CommentsAscCell from '../CommentsAscCell/CommentsAscCell'
import Options from '../Options/Options'
import Nested from '../Nested/Nested'
import CmmtsCell from '../CmmtsCell/CmmtsCell'

export const QUERY = gql`
  query FindVideoQuery($id: Int!) {
    video: video(id: $id) {
      id
      url
      title
      thumbnail
      description
      views
      createdAt
      tags
      author {
        name
        avatar
        id
      }
    }
  }
`

const useStyles = createStyles((theme) => ({
  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 600,
  },
  link: {
    textDecoration: 'none',
    color: theme.colors.gray[9],
  },
  button: {
    float: 'right',
  },
}))

export const Loading = () => <Loaders />

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ video, page }) => {
  const { classes } = useStyles()
  const { isAuthenticated, currentUser } = useAuth()
  const [rating, setRating] = useState(0)
  const [count, setCount] = useState(0)
  const [state, setState] = useState('desc')
  return (
    <div>
      <Box>
        <Player
          fluid={false}
          width={'100%'}
          height={400}
          playsInline
          poster={video.thumbnail}
          src={video.url}
        >
          <ControlBar>
            <ReplayControl seconds={10} order={1.1} />
            <ForwardControl seconds={30} order={1.2} />
            <CurrentTimeDisplay order={4.1} />
            <TimeDivider order={4.2} />
            <PlaybackRateMenuButton rates={[5, 2, 1, 0.5, 0.1]} order={7.1} />
            <VolumeMenuButton />
          </ControlBar>
        </Player>
      </Box>
      <Container size="xl">
        <Grid mt="lg" gap="4">
          <Grid.Col md={2} lg={6} span={"auto"}>
            <Group mb="lg" grow>
              <Group spacing="xl">
                <Link to={'/tag/' + video.tags}>
                  <Tooltip label={video.tags}>
                    <Badge size="lg" color="indigo" variant="filled">
                      {video.tags}
                    </Badge>
                  </Tooltip>
                </Link>
              </Group>
              <div>
                <Tooltip label={`Rating`}>
                  <Rating
                    value={rating}
                    fractions={5}
                    readOnly
                    className={classes.button}
                  />
                </Tooltip>
              </div>
            </Group>
            <Title className={classes.title}>{video.title}</Title>
            <Group mt="lg" grow>
              <Group>
                <>
                  {video.author.avatar === null ? (
                    <Avatar size="40" round={true} name={video.author.name} />
                  ) : (
                    <Avatar
                      size="40"
                      round={true}
                      name={video.author.name}
                      src={video.author.avatar}
                    />
                  )}
                  <div>
                    <Text size="md" fw="bold" mt={5}>
                      <Link
                        to={
                          video.author.id == currentUser?.id
                            ? '/profile'
                            : `/channel/${video.author.id}`
                        }
                        className={classes.link}
                      >
                        {video.author.name}
                      </Link>
                    </Text>
                    <Text size="xs" color="dimmed">
                      <CountCell channel={video.author.id} /> Subscribers
                    </Text>
                  </div>
                </>
              </Group>
              <div>
                {isAuthenticated && (
                  <>
                    {video.author.id == currentUser.id ? null : (
                      <SubscribecheckCell
                        channel={video.author.id}
                        authorId={Number(currentUser?.id)}
                      />
                    )}
                  </>
                )}
              </div>
            </Group>
            <Accordion mt="lg" defaultValue="customization">
              <Accordion.Item value="customization">
                <Accordion.Control>
                  <Group>
                    <Text>{video.views} views</Text>
                    <Text>{format(video.createdAt)}</Text>
                  </Group>
                </Accordion.Control>
                <Accordion.Panel>{video.description}</Accordion.Panel>
              </Accordion.Item>
            </Accordion>
            <Tabs defaultValue="comments" mt="lg" color="indigo">
              <Tabs.List grow>
              <Tabs.Tab value="comments">Comments</Tabs.Tab>
                <Tabs.Tab
                  value="rating"
                  rightSection={
                    <Badge
                      sx={{ width: 16, height: 16, pointerEvents: 'none' }}
                      variant="filled"
                      size="xs"
                      p={0}
                    >
                      {count}
                    </Badge>
                  }
                >
                  Rating
                </Tabs.Tab>

              </Tabs.List>

              <Tabs.Panel value="rating" pt="xs">
                <Text mt="lg" fz="xl">
                  {count} Rating
                </Text>
                {isAuthenticated && <CommentForm videoId={video.id} />}
                <Divider mt="lg" />
                <div
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <Button.Group mt="lg">
                    <Button
                      variant="default"
                      leftIcon={<IconArrowBarDown />}
                      onClick={() => {
                        setState('asc')
                      }}
                    >
                      Ascending
                    </Button>

                    <Button
                      variant="default"
                      leftIcon={<IconArrowBarUp />}
                      onClick={() => {
                        setState('desc')
                      }}
                    >
                      Descending
                    </Button>
                  </Button.Group>
                </div>
                {state === 'desc' ? (
                  <CommentsCell
                    videoId={video.id}
                    id={Number(video.id)}
                    totalRating={setRating}
                    totalComments={setCount}
                    page={page}
                  />
                ) : (
                  <CommentsAscCell
                    videoId={video.id}
                    id={Number(video.id)}
                    totalRating={setRating}
                    totalComments={setCount}
                    page={page}
                  />
                )}
              </Tabs.Panel>

              <Tabs.Panel value="comments" pt="xs">
                <Nested videoId={video.id} />
                <CmmtsCell id={video.id}/>
              </Tabs.Panel>
            </Tabs>
          </Grid.Col>
          <Grid.Col md={2} lg={4} offset={2} >
            <Options
              via={'https://www.epoch.vercel.app'}
              name={video.title}
              tag={video.tags}
              url={`https://www.epoch.vercel.app/watch/${video.id}`}
              createdAt={video.createdAt}
            />
            <Title>Similar Videos</Title>
            <SimilarCell tag={video.tags} />
          </Grid.Col>
        </Grid>
      </Container>
    </div>
  )
}
