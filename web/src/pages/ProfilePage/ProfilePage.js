import { Link, routes } from '@redwoodjs/router'
import { MetaTags, useMutation } from '@redwoodjs/web'
import { StatsCard } from 'src/components/Profile/Profile'
import { FileInput } from '@mantine/core'
import {
  Container,
  Divider,
  Text,
  Tabs,
  Button,
  Textarea,
  ColorInput,
  TextInput,
  Anchor,
} from '@mantine/core'
import { useAuth } from '@redwoodjs/auth'
import { Modal, Group } from '@mantine/core'
import { useState } from 'react'
import { useForm } from '@mantine/form'
import axios from 'axios'
import { toast, Toaster } from '@redwoodjs/web/dist/toast'
import { UploadClient } from '@uploadcare/upload-client'
import { format } from 'timeago.js'
import YourCell from 'src/components/YourCell/YourCell'



const UPDATE_PROFILE = gql`
  mutation UpdateUserMutation($id: Int!, $input: UpdateUserInput!) {
    updateUser(id: $id, input: $input) {
      id
      about
      website
      other
      avatar
      cover
      name
    }
  }
`

const ProfilePage = () => {
  const [create, { loading, error }] = useMutation(UPDATE_PROFILE, {
    onCompleted: () => {
      window.location.reload()
    },
    onError: () => {
      toast.error(error.message)
    },
  })
  const { currentUser } = useAuth()
  const [opened, setOpened] = useState(false)
  const [value, setValue] = useState(null)
  const form = useForm({
    initialValues: {
      about: currentUser?.about,
      website: currentUser?.website,
      other: currentUser?.other,
      avatar: currentUser?.avatar,
      cover: currentUser?.cover,
      name: currentUser?.name,
    },
  })
  const onSubmit = async (data) => {
    try {
      if (value) {
        const client = new UploadClient({ publicKey: process.env.PUBLIC_KEY })
        let a = await client.uploadFile(value)
        if (a.cdnUrl) {
          const payload = {
            about: data.about,
            website: data.website,
            other: data.other,
            avatar: a.cdnUrl,
            cover: data.cover,
            name: data.name,
          }
          create({ variables: { id: currentUser.id, input: payload } })
        }
      } else {
        const payload = {
          about: data.about,
          website: data.website,
          other: data.other,
          cover: data.cover,
          name: data.name,
        }
        create({ variables: { id: currentUser.id, input: payload } })
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (

    <>
      <MetaTags title="Profile" description="Profile page" />
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      <StatsCard />
      <Tabs defaultValue="videos" color="indigo">
        <Tabs.List grow>
          <Tabs.Tab value="videos">Videos</Tabs.Tab>
          <Tabs.Tab value="about">About</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="videos" pt="xs">
          <Container size="xl" mt="lg">
            <YourCell id={Number(currentUser?.id)} />
          </Container>
        </Tabs.Panel>

        <Tabs.Panel value="about" pt="xs">
          <Container size="xl" mt="lg">
            <Text fz="xl">Description</Text>
            <Divider mt="sm" />
            <Text mt="xs">
              {currentUser?.about ? currentUser.about : 'Wow such empty here'}
            </Text>
            <Text fz="xl" mt="lg">
              Website
            </Text>
            <Divider mt="sm" />
            <Text mt="xs">
              {currentUser?.website ? (
                <Anchor href={currentUser?.website} target="_blank">
                  {currentUser?.website}
                </Anchor>
              ) : (
                'Wow such empty here'
              )}
            </Text>
            <Text fz="xl" mt="lg">
              Other link
            </Text>
            <Divider mt="sm" />
            <Text mt="xs">
              {currentUser?.other ? (
                <Anchor href={currentUser?.other} target="_blank">
                  {currentUser?.other}
                </Anchor>
              ) : (
                'Wow such empty here'
              )}
            </Text>
            <Text fz="xl" mt="lg">
              Joined
            </Text>
            <Divider mt="sm" />
            <Text mt="xs">
              {currentUser?.createdAt
                ? format(currentUser?.createdAt)
                : 'Wow such empty here'}
            </Text>
            <Divider mt="lg" />
            <Button mt="lg" onClick={() => setOpened(true)} color="indigo">
              <strong>Update profile</strong>
            </Button>
          </Container>
        </Tabs.Panel>
      </Tabs>

      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Update profile"
        fullScreen
      >
        <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
          <Textarea
            size="md"
            radius="md"
            label="About"
            placeholder="About"
            name="about"
            defaultValue={currentUser?.about}
            {...form.getInputProps('about')}
          />
          <TextInput
            size="md"
            radius="md"
            label="Username"
            placeholder="Username"
            mt="lg"
            name="name"
            defaultValue={currentUser?.name}
            {...form.getInputProps('name')}
          />
          <TextInput
            size="md"
            radius="md"
            label="Website link"
            placeholder="Website link"
            mt="lg"
            name="website"
            defaultValue={currentUser?.website}
            {...form.getInputProps('website')}
          />
          <TextInput
            size="md"
            radius="md"
            label="Other link"
            placeholder="Other link"
            mt="lg"
            name="other"
            defaultValue={currentUser?.other}
            {...form.getInputProps('other')}
          />
          <TextInput
            size="md"
            radius="md"
            label="Cover image URL for your profile"
            placeholder="Cover image URL for your profile"
            mt="lg"
            name="cover"
            defaultValue={currentUser?.cover}
            {...form.getInputProps('cover')}
          />
          <FileInput
            value={value}
            radius="md"
            onChange={setValue}
            mt="lg"
            size="md"
            label="Upload Avatar"
            placeholder="Upload Avatar"
            accept="image/png,image/jpeg"
          />
          <Button
            size="md"
            mt="lg"
            color="indigo"
            type="submit"
            loading={loading}
          >
            <strong>Save</strong>
          </Button>
        </form>
      </Modal>
    </>
  )
}

export default ProfilePage
