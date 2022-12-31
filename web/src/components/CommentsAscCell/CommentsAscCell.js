import {
  createStyles,
  Text,
  Group,
  Paper,
  TypographyStylesProvider,
  Rating,
  Button,
  LoadingOverlay,
} from '@mantine/core'
import { openConfirmModal } from '@mantine/modals'
import { useAuth } from '@redwoodjs/auth'
import { Link, navigate, Router } from '@redwoodjs/router'
import { useState } from 'react'
import Avatar from 'react-avatar'
import { format } from 'timeago.js'
import { useMutation } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/dist/toast'
import Loaders from '../Loader/Loader'
import Pagination from '../Pagination/Pagination'


export const QUERY = gql`
  query CommentQuery($page: Int, $id: Int!) {
    commentsPageAsc(page: $page , id: $id) {
      comments {
        id
        content
        createdAt
        rating
        author {
          avatar
          name
          id
        }
      }
      count
    }
  }
`
const DELETE_COMMENT_MUTATION = gql`
  mutation DeleteCommentMutation($id: Int!) {
    deleteComment(id: $id) {
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

export const beforeQuery = ({ page , id }) => {
  page = page ? parseInt(page, 10) : 1

  return { variables: { page , id } }
}

export const Success = ({  commentsPageAsc, totalRating, totalComments, videoId }) => {
  const { classes } = useStyles()
  const [loading, setLoading] = useState(false)
  const { isAuthenticated, currentUser } = useAuth()
  const rating =  commentsPageAsc.comments.map((e) => {
    return e.rating
  })

  const [deleteComment] = useMutation(DELETE_COMMENT_MUTATION, {
    onCompleted: () => {
      window.location.reload()
    },
    onError: () => {
      toast.error('Something went wrong please try again!')
    },
  })

  function calculate(voters) {
    var total_per_rate = 0
    var total_voters = 0

    for (var i = 1; i <= voters.length; i++) {
      total_per_rate += i * voters[i - 1]
      total_voters += voters[i - 1]
    }

    return (total_per_rate / total_voters).toPrecision(2)
  }

  let final = calculate(rating)
  totalRating(Number(final))
  totalComments(commentsPageAsc.comments.length)

  function startDelete(id) {
    if (typeof id === 'number') {
      deleteComment({ variables: { id } })

      setLoading(false)
    } else {
      toast.error('Something went wrong when deleting rating!')
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

        { commentsPageAsc.comments.map((item) => {
          return (
            <Paper
              key={item.id}
              mt="lg"
              withBorder
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
                  <div className={classes.button}>
                    <Rating defaultValue={item.rating} readOnly />
                  </div>
                </Group>
              </Group>
              <TypographyStylesProvider className={classes.body}>
                <div
                  className={classes.content}
                  dangerouslySetInnerHTML={{ __html: item.content }}
                />
              </TypographyStylesProvider>
              {isAuthenticated && currentUser?.id === item.author.id ? (
                <Button
                  mt="lg"
                  color="red"
                  size="xs"
                  variant="light"
                  onClick={() => {
                    deleteComments(Number(item.id))
                  }}
                >
                  <strong>Delete rating</strong>
                </Button>
              ) : null}
            </Paper>
          )
        })}
     <Pagination count={commentsPageAsc.count} route={`watch/${videoId}`} />
    </>
  )
}
