import { Container, Title, Box, Divider, Button } from '@mantine/core'
import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { IconArrowBarDown, IconArrowBarUp } from '@tabler/icons'
import { useState } from 'react'
import VideosascCell from 'src/components/VideosascCell/VideosascCell'
import VideosCell from 'src/components/VideosCell/VideosCell'


const ExplorePage = ({ page }) => {
  const [state, setState] = useState('desc')
  return (
    <>
      <MetaTags title="Explore" description="Explore page" />

      <Container size="xl">
        <Box mt="lg">
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Title>Explore</Title>
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
        {state === 'desc' ? <VideosCell page={page} /> : <VideosascCell page={page} />}
      </Container>
    </>
  )
}

export default ExplorePage
