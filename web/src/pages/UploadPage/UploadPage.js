import {
  Container,
  TextInput,
  Grid,
  Divider,
  Textarea,
  MultiSelect,
  AspectRatio,
  Select,
  List,
  Button,
  Alert,
} from '@mantine/core'
import { useAuth } from '@redwoodjs/auth'
import { Link, navigate, routes } from '@redwoodjs/router'
import { MetaTags, useMutation } from '@redwoodjs/web'
import { useEffect, useState } from 'react'
import Types from '../../mock/types'
import { VideoUpload } from 'src/components/VideoUpload'
import { format } from 'timeago.js'
import { useForm } from '@mantine/form'
import { toast, Toaster } from '@redwoodjs/web/dist/toast'
import axios from 'axios'
import { IconAlertCircle } from '@tabler/icons'

const CREATE_VIDEO = gql`
  mutation CreateVideoMutation($input: CreateVideoInput!) {
    createVideo(input: $input) {
      id
      title
      description
      authorId
      url
      tags
      published
    }
  }
`

const UploadPage = () => {
  const [create, { loading, error }] = useMutation(CREATE_VIDEO, {
    onCompleted: () => {
      navigate('/explore')
    },
  })

  const [loadings, setLoading] = useState(false)
  const { isAuthenticated, currentUser } = useAuth()
  const [video, setVideo] = useState(null)
  useEffect(() => {
    if (!isAuthenticated) {
      navigate(routes.login())
    }
  }, [isAuthenticated])

  const form = useForm({
    initialValues: {
      title: '',
      description: '',
      tags: '',
      visibility: '',
    },

    validate: {
      title: (value) => (value ? null : 'Title is required'),
      description: (value) => (value ? null : 'Description is required'),
      visibility: (value) => (value ? null : 'Visibility is required'),
    },
  })

  const uploadVideo = async (data) => {
    try {
      setLoading(true)
      const datas = new FormData()
      datas.append('file', video.file)
      datas.append('upload_preset', process.env.CLOUD_NAME)
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.CLOUD_P}/video/upload`,
        datas
      )
      if (res.data.url) {
        const payload = {
          title: data.title,
          description: data.description,
          tags: data.tags,
          published: data.visibility,
          authorId: currentUser.id,
          url: res.data.url,
        }
        create({ variables: { input: payload } })
        if (error) {
          toast.error(error.message)
          setLoading(false)
        }
      } else {
        toast.error('Something is wrong with your request.')
        setLoading(false)
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
        <h1>Upload video</h1>
        <Divider />
        {video == null ? (
          <>
            <VideoUpload setVideo={setVideo} />
          </>
        ) : (
          <form onSubmit={form.onSubmit((values) => uploadVideo(values))}>
            <Alert
              icon={<IconAlertCircle size={16} />}
              title="Hello!"
              color="indigo"
              variant="outline"
            >
              You can change the video thumbnail by going to studio {"->"} videos
              tab {"->"} edit video, and then changing the video thumbnail.
              Alternatively, the video thumbnail will be generated
              automatically.
            </Alert>
            <Grid mt="lg" grow={4}>
              <Grid.Col md={6} lg={8}>
                <TextInput
                  label="Video title"
                  name="title"
                  withAsterisk
                  radius="md"
                  size="md"
                  placeholder="video title"
                  {...form.getInputProps('title')}
                />
                <Textarea
                  mt="lg"
                  label="Video description"
                  name="description"
                  withAsterisk
                  radius="md"
                  size="md"
                  placeholder="video description"
                  {...form.getInputProps('description')}
                />
                <Select
                  mt="lg"
                  data={Types}
                  withAsterisk
                  label="Video category"
                  placeholder="Video category"
                  radius="md"
                  size="md"
                  searchable
                  {...form.getInputProps('tags')}
                />
                <Select
                  withAsterisk
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
              <Grid.Col md={6} lg={4}>
                {video && (
                  <AspectRatio ratio={16 / 9}>
                    <iframe
                      src={video.url}
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </AspectRatio>
                )}
                <List mt="lg" withPadding>
                  <List.Item>
                    <strong>Name:</strong> {video.file.name}
                  </List.Item>
                  <List.Item>
                    <strong>Size:</strong> {video.file.size}
                  </List.Item>
                  <List.Item>
                    <strong>Type:</strong> {video.file.type}
                  </List.Item>
                  <List.Item>
                    <strong>Last modified:</strong>{' '}
                    {format(video.file.lastModified)}
                  </List.Item>
                </List>
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
        )}
      </Container>
    </>
  )
}

export default UploadPage
