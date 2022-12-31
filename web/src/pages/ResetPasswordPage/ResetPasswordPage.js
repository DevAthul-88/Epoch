import { useEffect, useRef, useState } from 'react'
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
import { useAuth } from '@redwoodjs/auth'
import { Link, navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'
import { useForm } from '@mantine/form'

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

const ResetPasswordPage = ({ resetToken }) => {
  const form = useForm({
    initialValues: {
      email: '',
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  })
  const { isAuthenticated, reauthenticate, validateResetToken, resetPassword } =
    useAuth()
  const [enabled, setEnabled] = useState(true)

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.home())
    }
  }, [isAuthenticated])

  useEffect(() => {
    const validateToken = async () => {
      const response = await validateResetToken(resetToken)
      if (response.error) {
        setEnabled(false)
        toast.error(response.error)
      } else {
        setEnabled(true)
      }
    }
    validateToken()
  }, [])

  const passwordRef = useRef(null)
  useEffect(() => {
    passwordRef.current?.focus()
  }, [])

  const onSubmit = async (data) => {
    const response = await resetPassword({
      resetToken,
      password: data.password,
    })

    if (response.error) {
      toast.error(response.error)
    } else {
      toast.success('Password changed!')
      await reauthenticate()
      navigate(routes.login())
    }
  }
  const { classes } = useStyles()
  return (
    <>
      <MetaTags title="Reset Password" />


        <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
        <Container size={460} my={30}>
        <Title className={classes.title} align="center">
          Reset your password
        </Title>
        <Text color="dimmed" size="sm" align="center">
          Enter your new password
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
               Submit
              </Button>
            </Group>
          </Paper>
        </form>
      </Container>
    </>
  )
}

export default ResetPasswordPage
