import { Box, Textarea, Divider, Button, Rating } from '@mantine/core'
import { useForm } from '@mantine/form'
import React, { useState } from 'react'
import { toast, Toaster } from '@redwoodjs/web/dist/toast'
import { useMutation } from '@redwoodjs/web'
import { useAuth } from '@redwoodjs/auth'
import { Router, useParams } from '@redwoodjs/router'

const CREATE_CMMT = gql`
  mutation CreateCmmtMutation($input: CreateCmmtInput!) {
    createCmmt(input: $input) {
      authorId
      content
      parentId
    }
  }
`

function Nested({ videoId }) {
  const form = useForm({
    initialValues: {
      comment: '',
    },

    validate: {
      comment: (value) => (value ? null : 'Comment is required'),
    },
  })
  const [loadings, setLoading] = useState(false)
  const { isAuthenticated, currentUser } = useAuth()
  const [create, { loading, error }] = useMutation(CREATE_CMMT, {
    onCompleted: () => {
      window.location.reload()
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
        parentId: Number(videoId),
        authorId: currentUser.id,
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
          label="Add comment"
          placeholder="Add comment"
          radius="md"
          size="md"
          {...form.getInputProps('comment')}
        />

        <Button type="submit" color="green" mt="lg" loading={loadings}>
          <strong>Add comment</strong>
        </Button>
      </form>
    </Box>
  )
}

export default Nested
