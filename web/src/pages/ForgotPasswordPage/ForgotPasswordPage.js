import { useEffect, useRef } from 'react'
import {
  createStyles,
  Paper,
  Title,
  Text,
  TextInput,
  Button,
  Container,
  Group,
  Anchor,
  Center,
  Box,
} from '@mantine/core'
import { IconArrowLeft } from '@tabler/icons'

const useStyles = createStyles((theme) => ({
  title: {
    fontSize: 26,
    fontWeight: 900,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },

  controls: {
    [theme.fn.smallerThan('xs')]: {
      flexDirection: 'column-reverse',
    },
  },

  control: {
    [theme.fn.smallerThan('xs')]: {
      width: '100%',
      textAlign: 'center',
    },
  },
}))

import { useAuth } from '@redwoodjs/auth'
import { Link, navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'
import { useForm } from '@mantine/form'

const ForgotPasswordPage = () => {
  const form = useForm({
    initialValues: {
      email: '',
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  })
  const { isAuthenticated, forgotPassword } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.home())
    }
  }, [isAuthenticated])

  const usernameRef = useRef(null)
  useEffect(() => {
    usernameRef?.current?.focus()
  }, [])

  const onSubmit = async (data) => {
    const response = await forgotPassword(data.username)

    if (response.error) {
      toast.error(response.error)
    } else {
      // The function `forgotPassword.handler` in api/src/functions/auth.js has
      // been invoked, let the user know how to get the link to reset their
      // password (sent in email, perhaps?)
      toast.success(
        'A link to reset your password was sent to ' + response.email
      )

      navigate(routes.login())
    }
  }
  const { classes } = useStyles()
  return (
    <>
      <MetaTags title="Forgot Password" />

      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      <Container size={460} my={30}>
        <Title className={classes.title} align="center">
          Forgot your password?
        </Title>
        <Text color="dimmed" size="sm" align="center">
          Enter your email to get a reset link
        </Text>
        <form onSubmit={form.onSubmit((values) => onSubmit(values.email))}>
          <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
            <TextInput
              size="md"
              radius={'md'}
              label="Your email"
              placeholder="Your email"
              {...form.getInputProps('email')}
              withAsterisk
            />
            <Group position="apart" mt="lg" className={classes.controls}>
              <Anchor color="dimmed" size="sm" className={classes.control}>
                <Center inline>
                  <IconArrowLeft size={12} stroke={1.5} />
                  <Box ml={5}>
                    <Link to={routes.login()} className="vb">
                      Back to login page
                    </Link>
                  </Box>
                </Center>
              </Anchor>
              <Button className={classes.control} type="submit" color="indigo">
                Send mail
              </Button>
            </Group>
          </Paper>
        </form>
      </Container>
    </>
  )
}

export default ForgotPasswordPage
