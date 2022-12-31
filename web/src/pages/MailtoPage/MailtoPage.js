import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const MailtoPage = () => {
  return (
    <>
      <MetaTags title="Mailto" description="Mailto page" />

      <h1>MailtoPage</h1>
      <p>
        Find me in <code>./web/src/pages/MailtoPage/MailtoPage.js</code>
      </p>
      <p>
        My default route is named <code>mailto</code>, link to me with `
        <Link to={routes.mailto()}>Mailto</Link>`
      </p>
    </>
  )
}

export default MailtoPage
