import { useRef } from 'react'
import { useEffect , useState } from 'react'
import {
  Paper,
  createStyles,
  TextInput,
  PasswordInput,
  Checkbox,
  Button,
  Title,
  Text,
  Anchor,
} from '@mantine/core'
import { useAuth } from '@redwoodjs/auth'
import { Link, navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'
import { useForm } from '@mantine/form'

const useStyles = createStyles((theme) => ({
  wrapper: {
    minHeight: 900,
    backgroundSize: 'cover',
    backgroundImage:
      'url(https://images.unsplash.com/photo-1657051725161-00089344fb05?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=872&q=80)',
  },

  form: {
    borderRight: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3]
    }`,
    minHeight: 900,
    maxWidth: 450,
    paddingTop: 80,

    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      maxWidth: '100%',
    },
  },

  title: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },

  logo: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    width: 120,
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
}))

const LoginPage = () => {
  const { isAuthenticated, logIn } = useAuth()
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.home())
    }
  }, [isAuthenticated])

  const usernameRef = useRef(null)
  useEffect(() => {
    usernameRef.current?.focus()
  }, [])

  const onSubmit = async (data) => {
    setLoading(true)
    const response = await logIn({ ...data })

    if (response.message) {
      toast(response.message)
    } else if (response.error) {
      setLoading(false)
      toast.error(response.error)
    } else {
      toast.success('Welcome back!')
    }
  }
  const { classes } = useStyles()

  const form = useForm({
    initialValues: {
      username: '',
      password: '',
    },

    validate: {
      username: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => (value ? null : 'Password is required'),
    },
  })
  return (
    <>
      <MetaTags title="Login" />
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      <div className={classes.wrapper}>
        <Paper className={classes.form} radius={0} p={30}>
          <Title
            order={2}
            className={classes.title}
            align="center"
            mt="md"
            mb={50}
          >
            Welcome back to Epoch
          </Title>

          <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
            <TextInput
              withAsterisk
              name="email"
              label="Email address"
              placeholder="hello@gmail.com"
              size="md"
              {...form.getInputProps('username')}
            />
            <PasswordInput
              withAsterisk
              label="Password"
              name="password"
              placeholder="Your password"
              mt="md"
              size="md"
              {...form.getInputProps('password')}
            />
            <Button
              loading={loading}
              type="submit"
              fullWidth
              mt="xl"
              size="md"
              color="indigo"
            >
              Login
            </Button>
          </form>

          <Text align="center" mt="md">
            Don't have an account?{' '}
            <Link to="/signup" className='vb'>Signup</Link>
          </Text>

          <Text align="center" mt="md">
            Forgot password?{' '}
            <Link to="/forgot-password" className='vb'>Forgot password</Link>
          </Text>

        </Paper>
      </div>
    </>
  )
}

export default LoginPage
