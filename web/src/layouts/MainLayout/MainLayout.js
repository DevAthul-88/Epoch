import { Headers } from 'src/components/Header'
import Links from 'src/mock/link'

const MainLayout = ({ children }) => {
  return (
    <>
      <Headers links={Links.links} />
      {children}
    </>
  )
}

export default MainLayout
