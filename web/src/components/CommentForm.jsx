import { Box, Textarea, Divider, Button, Rating } from '@mantine/core'
import { useForm } from '@mantine/form'
import React, { useState } from 'react'
import { toast, Toaster } from '@redwoodjs/web/dist/toast'
import { useMutation } from '@redwoodjs/web'
import { useAuth } from '@redwoodjs/auth'
import { navigate ,} from '@redwoodjs/router'
import { QUERY } from './CommentsCell/CommentsCell'


const CREATE_COMMENT = gql`
  mutation CreateCommentMutation($input: CreateCommentInput!) {
    createComment(input: $input) {
      authorId
      content
      videoId
      rating
    }
  }
`

function CommentForm({ videoId }) {
  const form = useForm({
    initialValues: {
      comment: '',
    },

    validate: {
      comment: (value) => (value ? null : 'Rating is required'),
    },
  })
  const [value, setValue] = useState(1)
  const [loadings, setLoading] = useState(false)
  const { isAuthenticated, currentUser } = useAuth()
  const [create, { loading, error }] = useMutation(CREATE_COMMENT, {
    onCompleted: () => {
      window.location.reload();
    },
    onError: () => {
      toast.error(error.message)
      setLoading(false)
    },
  })

  const addComment = async (data) => {
    try {
      setLoading(true)
      const payload = {
        content: data.comment,
        rating: value,
        authorId: currentUser.id,
        videoId: Number(videoId),
      }
      create({ variables: { input: payload } })
    } catch (error) {
      toast.error(error.message)
      setLoading(false)
    }
  }

  return (
    <Box mt="lg">
     <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      <form onSubmit={form.onSubmit((values) => addComment(values))}>
        <Textarea
          withAsterisk
          name="comment"
          label="Add rating"
          placeholder="Add rating"
          radius="md"
          size="md"
          {...form.getInputProps('comment')}
        />

        <Box mt="lg">
          <label>Your rating</label>
          <Rating defaultValue={1} color="indigo" onChange={setValue} />
          <Button type="submit" color="green" mt="lg" loading={loadings}>
            <strong>Add rating</strong>
          </Button>
        </Box>
      </form>
    </Box>
  )
}

export default CommentForm
