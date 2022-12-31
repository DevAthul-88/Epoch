import {
  Container,
  TextInput,
  Grid,
  Divider,
  Textarea,
  Select,
  Button,
  FileInput,
} from '@mantine/core'
import { useAuth } from '@redwoodjs/auth'
import { navigate, routes } from '@redwoodjs/router'
import { MetaTags, useMutation } from '@redwoodjs/web'
import { useEffect, useState } from 'react'
import Types from '../../mock/types'
import { useForm } from '@mantine/form'
import { toast, Toaster } from '@redwoodjs/web/dist/toast'
import { UploadClient } from '@uploadcare/upload-client'

const EDIT_VIDEO = gql`
  mutation updateVideoMutation($id: Int!, $input: UpdateVideoInput!) {
    updateVideo(id: $id, input: $input) {
      id
      title
      description
      authorId
      tags
      published
    }
  }
`

const Editvideo = ({ data, id }) => {
  const [value, setValue] = useState(null)
  const [loadings, setLoading] = useState(false)
  const [create, { loading, error }] = useMutation(EDIT_VIDEO, {
    onCompleted: () => {
      navigate('/studio')
      toast.success('Video edited successfully!')
    },
    onError: () => {
      toast.error(error.message)
      setLoading(false)
    },
  })

  const { isAuthenticated, currentUser } = useAuth()
  useEffect(() => {
    if (!isAuthenticated) {
      navigate(routes.login())
    }
  }, [isAuthenticated])

  const form = useForm({
    initialValues: {
      title: data?.title,
      description: data?.description,
      tags: data?.tags,
      visibility: data?.published,
    },
  })

  const uploadVideo = async (data) => {
    try {
      setLoading(true)
      if (value) {
        const client = new UploadClient({ publicKey: '70c55f5ec85a072e2d96' })
        let a = await client.uploadFile(value)
        if (a.cdnUrl) {
          const payload = {
            title: data.title,
            description: data.description,
            tags: data.tags,
            published: data.visibility,
            authorId: currentUser.id,
            thumbnail: a.cdnUrl,
          }
          create({ variables: { input: payload, id: id } })
        }
      } else {
        const payload = {
          title: data.title,
          description: data.description,
          tags: data.tags,
          published: data.visibility,
          authorId: currentUser.id,
        }
        create({ variables: { input: payload, id: id } })
      }
    } catch (error) {
      toast.error(error.message)
      setLoading(false)
    }
  }

  return (
    <>
      <MetaTags title="Upload" description="Upload page" />
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      <Container size="xl">
        <h1>Edit video</h1>
        <Divider />
        <form onSubmit={form.onSubmit((values) => uploadVideo(values))}>
          <Grid mt="lg" grow={4}>
            <Grid.Col md={6} lg={8}>
              <TextInput
                label="Video title"
                name="title"
                radius="md"
                size="md"
                placeholder="video title"
                {...form.getInputProps('title')}
              />
              <Textarea
                mt="lg"
                label="Video description"
                name="description"
                radius="md"
                size="md"
                placeholder="video description"
                {...form.getInputProps('description')}
              />
              <FileInput
                value={value}
                radius="md"
                onChange={setValue}
                mt="lg"
                size="md"
                label="Upload thumbnail"
                placeholder="Upload thumbnail"
                accept="image/png,image/jpeg"
              />
              <Select
                name="tags"
                mt="lg"
                data={Types}
                label="Video category"
                placeholder="Video category"
                radius="md"
                size="md"
                searchable
                {...form.getInputProps('tags')}
              />
              <Select
                name="visibility"
                mt="lg"
                radius="md"
                size="md"
                label="Video visibility"
                placeholder="Video visibility"
                data={[
                  { value: 'hidden', label: 'Hidden' },
                  { value: 'public', label: 'Public' },
                ]}
                {...form.getInputProps('visibility')}
              />
            </Grid.Col>
          </Grid>
          <Divider mt="lg" />
          <Button
            size="md"
            type="submit"
            mt="lg"
            color="green"
            loading={loadings}
          >
            <strong>Save video</strong>
          </Button>
        </form>
      </Container>
    </>
  )
}

export default Editvideo
