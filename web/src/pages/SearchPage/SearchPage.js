import { Link, routes, useParams } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { Container, Title, Divider, Box, Button } from '@mantine/core'
import SearchCell from 'src/components/SearchCell/SearchCell'
import VideossearchdCell from 'src/components/VideossearchdCell/VideossearchdCell'
import { useState } from 'react'
import { IconArrowBarDown, IconArrowBarUp } from '@tabler/icons'

const SearchPage = () => {
  const { s } = useParams()
  const [state, setState] = useState('desc')
  return (
    <>
      <MetaTags title="Search" description="Search page" />

      <Container size="xl">
        <Box mt="lg">
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Title>Found results for '{s}' </Title>
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

        {state === 'desc' ? <VideossearchdCell s={s} /> : <SearchCell s={s} />}
      </Container>
    </>
  )
}

export default SearchPage
