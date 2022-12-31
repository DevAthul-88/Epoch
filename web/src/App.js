import './index.css'
import { AuthProvider } from '@redwoodjs/auth'
import { FatalErrorBoundary, RedwoodProvider } from '@redwoodjs/web'
import { RedwoodApolloProvider } from '@redwoodjs/web/apollo'
import { MantineProvider } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals';
import FatalErrorPage from 'src/pages/FatalErrorPage'
import Routes from 'src/Routes'
import './scaffold.css'
import './video.css'

const App = () => (
  <FatalErrorBoundary page={FatalErrorPage}>
    <RedwoodProvider titleTemplate="%PageTitle | %AppTitle">
      <AuthProvider type="dbAuth">
        <RedwoodApolloProvider>
          <MantineProvider
            withGlobalStyles
            withNormalizeCSS
            theme={{
              focusRing: 'always',
              focusRingStyles: {
                styles: (theme) => ({
                  outline: `2px solid ${theme.colors.indigo[5]}`,
                }),
                inputStyles: (theme) => ({
                  outline: `2px solid ${theme.colors.indigo[5]}`,
                }),
              },

              fontFamily: "Inter, sans-serif",
            }}
          >
            <ModalsProvider>
            <Routes />
            </ModalsProvider>
          </MantineProvider>
        </RedwoodApolloProvider>
      </AuthProvider>
    </RedwoodProvider>
  </FatalErrorBoundary>
)

export default App
