/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'

import { Button } from './components/lib'

function Nav({ handleLogout, user }) {
  console.log('user', user)
  return (
    <nav
      css={{
        width: '100vw',
        display: 'flex',
        justifyContent: 'space-between',
        padding: '0.5rem 1rem',
      }}
    >
      <h2>Tu Es</h2>
      <div>
        <span css={{ padding: '0 1rem' }}>{user.email}</span>
        <Button variant="secondary" onClick={handleLogout}>
          Log out
        </Button>
      </div>
    </nav>
  )
}

function AuthenticatedApp({ handleLogout, user }) {
  return (
    <React.Fragment>
      <Nav handleLogout={handleLogout} user={user} />
    </React.Fragment>
  )
}

export default AuthenticatedApp
