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
      <span>
        {user.email}{' '}
        <Button variant="secondary" onClick={handleLogout}>
          Log out
        </Button>
      </span>
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
