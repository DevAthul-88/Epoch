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
import { format } from 'timeago.js'


const Channeldetails = ({User}) => {
  return (
    <div>
        <Container size="lg" mt="lg">
            <Text fz="xl">Description</Text>
            <Divider mt="sm" />
            <Text mt="xs">
              {User?.about ? User.about : 'Wow such empty here'}
            </Text>
            <Text fz="xl" mt="lg">
              Website
            </Text>
            <Divider mt="sm" />
            <Text mt="xs">
              {User?.website ? (
                <Anchor href={User?.website} target="_blank">
                  {User?.website}
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
              {User?.other ? (
                <Anchor href={User?.other} target="_blank">
                  {User?.other}
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
              {User?.createdAt
                ? format(User?.createdAt)
                : 'Wow such empty here'}
            </Text>
          </Container>
    </div>
  )
}

export default Channeldetails
