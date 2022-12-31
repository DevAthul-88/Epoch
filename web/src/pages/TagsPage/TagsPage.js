import { Container, Title, Divider , Box , Button } from '@mantine/core'
import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import VideostagCell from 'src/components/VideostagCell/VideostagCell'
import { IconArrowBarDown, IconArrowBarUp } from '@tabler/icons'
import { useState } from 'react'
import VideostagdescCell from 'src/components/VideostagdescCell/VideostagdescCell'

const TagsPage = ({ id }) => {
  const [state, setState] = useState('desc')
  const tag = decodeURIComponent(id)
  return (
    <>
      <MetaTags title="Tags" description="Tags page" />

      <Container size="xl">
        <Box mt="lg">
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Title>Videos tagged with {JSON.stringify(tag)} </Title>
            <Button.Group>
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
        </Box>
        <Divider mt="lg" />

        {state === 'desc' ? (
          <VideostagdescCell tag={id} />
        ) : (
          <VideostagCell tag={id} />
        )}
      </Container>
    </>
  )
}

export default TagsPage
