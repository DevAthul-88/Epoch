import Loaders from '../Loader/Loader'
import {
  createStyles,
  Text,
  Group,
  Paper,
  TypographyStylesProvider,
  Rating,
  Button,
  LoadingOverlay,
  Divider,
  Anchor,
  Breadcrumbs,
  Box,
} from '@mantine/core'
import { openConfirmModal } from '@mantine/modals'
import { useAuth } from '@redwoodjs/auth'
import { Link, navigate, Router } from '@redwoodjs/router'
import { useState } from 'react'
import Avatar from 'react-avatar'
import { format } from 'timeago.js'
import { useMutation } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/dist/toast'
import Nested from '../Nested/Nested'
import NestedComments from './NestedCommentsCell'

export const QUERY = gql`
  query NestedCmmtsQuery($id: Int!) {
    cmmts(id: $id) {
      id
      content
      createdAt
      author {
        avatar
        name
        id
      }
    }
  }
`

const DELETE_CMMT_MUTATION = gql`
  mutation DeleteCmmtMutation($id: Int!) {
    deleteCmmt(id: $id) {
      id
    }
  }
`

const useStyles = createStyles((theme) => ({
  comment: {
    padding: `${theme.spacing.lg}px ${theme.spacing.xl}px`,
  },
  body: {
    paddingLeft: 54,
    paddingTop: theme.spacing.sm,
  },
  content: {
    '& > p:last-child': {
      marginBottom: 0,
    },
  },
  button: {
    float: 'right',
  },
  link: {
    textDecoration: 'none',
    color: theme.colors.gray[9],
  },
}))

export const Loading = () => <Loaders />

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ cmmts }) => {
  const { classes } = useStyles()
  const [id, setId] = useState(null)
  const [open, setOpen] = useState(false)
  const [replay, setReplay] = useState(null)
  const [expand, setExpand] = useState(false)
  const { isAuthenticated, currentUser } = useAuth()
  const [loading, setLoading] = useState(false)
  const [deleteCmmt] = useMutation(DELETE_CMMT_MUTATION, {
    onCompleted: () => {
      window.location.reload()
    },
    onError: () => {
      toast.error('Something went wrong please try again!')
    },
  })
  function startDelete(id) {
    if (typeof id === 'number') {
      deleteCmmt({ variables: { id } })

      setLoading(false)
    } else {
      toast.error('Something went wrong when deleting comment!')
    }
  }

  const deleteComments = (id) =>
    openConfirmModal({
      title: 'Please confirm your action',
      centered: true,
      children: (
        <Text size="sm">Are you sure you want to delete this rating?</Text>
      ),
      confirmProps: { color: 'red' },
      labels: { confirm: 'Confirm', cancel: 'Cancel' },
      onCancel: () => console.log('Cancel'),
      onConfirm: () => (setLoading(true), startDelete(Number(id))),
    })

  return (
    <>
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      <LoadingOverlay visible={loading} overlayBlur={2} />

      {cmmts.map((item) => {
        return (
          <>
            <Paper
              ml="xl"
              style={{ marginLeft: '2rem' }}
              key={item.id}
              mt="lg"
              radius="md"
              className={classes.comment}
            >
              <Group>
                {item.author.avatar === null ? (
                  <Avatar size="40" round={true} name={item.author.name} />
                ) : (
                  <Avatar
                    size="40"
                    round={true}
                    name={item.author.name}
                    src={item.author.avatar}
                  />
                )}
                <Group>
                  <div>
                    <Text size="sm" fw="bold">
                      <Link
                        to={
                          item.author.id == currentUser?.id
                            ? '/profile'
                            : `/channel/${item.author.id}`
                        }
                        className={classes.link}
                      >
                        {item.author.name}
                      </Link>
                    </Text>
                    <Text size="xs" color="dimmed">
                      {format(item.createdAt)}
                    </Text>
                  </div>
                </Group>
              </Group>
              <TypographyStylesProvider className={classes.body}>
                <div
                  className={classes.content}
                  dangerouslySetInnerHTML={{ __html: item.content }}
                />
              </TypographyStylesProvider>
              <Breadcrumbs mt="xl" separator="→">
                {isAuthenticated ? (
                  <Anchor
                    size="sm"
                    color="indigo"
                    onClick={() => {
                      setId(Number(item.id))
                      setOpen(true)
                    }}
                  >
                    <strong>Replay</strong>
                  </Anchor>
                ) : null}
                {isAuthenticated ? (
                  <Anchor
                    fs={'sm'}
                    size="sm"
                    onClick={() => {
                      setReplay(Number(item.id))
                      setExpand(true)
                    }}
                  >
                    <strong>Show replays</strong>
                  </Anchor>
                ) : null}
                {isAuthenticated && currentUser?.id === item.author.id ? (
                  <Anchor
                    size="sm"
                    color="red"
                    onClick={() => {
                      deleteComments(Number(item.id))
                    }}
                  >
                    <strong>Delete comment</strong>
                  </Anchor>
                ) : null}
              </Breadcrumbs>
              {open === true && id === item.id && (
                <>
                  <Nested videoId={Number(id)} />
                  <Group position="right">
                    <Button
                      mt="xl"
                      color="red"
                      onClick={() => {
                        setId(null)
                        setOpen(false)
                      }}
                    >
                      <strong>X</strong>
                    </Button>
                  </Group>
                </>
              )}
            </Paper>
            <Divider />
            {replay === item.id && expand === true && (
              <Box ml="xl">
                <NestedComments
                  id={Number(item.id)}
                  parentId={Number(item.id)}
                />
              </Box>
            )}
          </>
        )
      })}
    </>
  )
}
