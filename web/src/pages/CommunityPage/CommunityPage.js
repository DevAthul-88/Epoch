import { Container, Divider, Title, Box, Button } from '@mantine/core'
import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import UsersCell from 'src/components/UsersCell/UsersCell'
import { IconArrowBarDown, IconArrowBarUp } from '@tabler/icons'
import { useState } from 'react'
import UsersascCell from 'src/components/UsersascCell/UsersascCell'

const CommunityPage = ({ page = 1 }) => {
  const [state, setState] = useState('desc')
  return (
    <>
      <MetaTags title="Community" description="Community page" />

      <Container size="xl">
        <Box mt="lg">
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Title>Community</Title>
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
          <UsersascCell page={page} />
        ) : (
          <UsersCell page={page} />
        )}
      </Container>
    </>
  )
}

export default CommunityPage
