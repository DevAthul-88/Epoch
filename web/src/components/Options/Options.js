import {
  Box,
  Text,
  Tag,
  CopyButton,
  Button,
  Flex,
  TextInput,
  Group,
  Tooltip,
  Badge,
} from '@mantine/core'
import { createStyles } from '@mantine/core'
import { Link } from '@redwoodjs/router'
import { format } from 'timeago.js'
import {
  EmailIcon,
  FacebookIcon,
  LinkedinIcon,
  RedditIcon,
  TelegramIcon,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  FacebookShareButton,
  EmailShareButton,
  RedditShareButton,
  TelegramShareButton,
  WhatsappShareButton,
  LinkedinShareButton
} from "react-share";

const useStyles = createStyles((theme) => ({
  box: {
    border: `4px solid ${theme.colors.gray[2]}`,
    borderRadius: '4px',
  },
}))

const Options = ({ name, createdAt, tag, url , via }) => {
  const { classes } = useStyles()
  return (
    <Box p="xl" className={classes.box} mb="xl">
      <Text>
        Added:  {format(createdAt)}
      </Text>
      <Text mt="md">{name}</Text>
      <Text mt="md">
        Tag:
        <Link to={'/tag/' + tag}>
          <Tooltip label={tag}>
            <Badge ml="sm" size="lg" color="indigo" variant="filled">
              {tag}
            </Badge>
          </Tooltip>
        </Link>
      </Text>
      <Text mt="md">Copy url: </Text>
      <Group grow>
        <TextInput value={url} mt="lg" readOnly />
        <CopyButton value={url}>
          {({ copied, copy }) => (
            <Button mt="md" color={copied ? 'teal' : 'indigo'} onClick={copy}>
              {copied ? 'Copied url' : 'Copy url'}
            </Button>
          )}
        </CopyButton>
      </Group>
      <Text mt="md">Share: </Text>
      <Group mt="lg">
        <TwitterShareButton  url={url} title={name} hashtags={[tag]} via={via}>
          <TwitterIcon size={32} round={true}/>
        </TwitterShareButton>

        <FacebookShareButton url={url} quote={name}>
          <FacebookIcon size={32} round={true} />
        </FacebookShareButton>


        <EmailShareButton url={url} subject={name}>
          <EmailIcon size={32} round={true} />
        </EmailShareButton>

        <RedditShareButton url={url} title={name}>
          <RedditIcon size={32} round={true} />
        </RedditShareButton>
        <TelegramShareButton url={url} title={name}>
          <TelegramIcon size={32} round={true} />
        </TelegramShareButton>
        <WhatsappShareButton url={url} title={name}>
          <WhatsappIcon size={32} round={true} />
        </WhatsappShareButton>
        <LinkedinShareButton url={url} summary={name} source={via}>
          <LinkedinIcon size={32} round={true} />
        </LinkedinShareButton>
      </Group>
    </Box>
  )
}

export default Options
