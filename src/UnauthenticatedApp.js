/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/core'
import { Modal, ModalContents, ModalOpenButton } from 'components/modal'
import React from 'react'

import {
  Button,
  ErrorMessage,
  FormGroup,
  Input,
  Spinner,
} from './components/lib'
import { useAsync } from './utils/hooks'

const errorMessages = (error) => {
  console.log('error', error)
  let message
  switch (error.code) {
    case 'auth/wrong-password':
    case 'auth/user-not-found':
    case 'auth/user-disabled':
      message = 'Invalid email or password'
      break
    case 'auth/invalid-email':
      message = error.message
      break
    case 'auth/email-already-in-use':
      message = 'Email already in use'
      break
    case 'auth/weak-password':
      message = error.message
      break
    default:
      throw new Error(`Uncaught error code '${error.code} in 'errorMessages'`)
  }
  console.log('message', message)
  return message
}

function LoginForm({ onSubmit, submitButton }) {
  const { isLoading, isError, error, run } = useAsync()

  function handleSubmit(event) {
    event.preventDefault()
    const { email, password } = event.target.elements

    run(
      onSubmit({
        email: email.value,
        password: password.value,
      })
    ).catch((e) => {
      console.log(e)
    })
  }

  const errorMessage = isError ? errorMessages(error) : null

  return (
    <form
      onSubmit={handleSubmit}
      css={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        '> div': {
          margin: '10px auto',
          width: '100%',
          maxWidth: '300px',
        },
      }}
    >
      <FormGroup>
        <label htmlFor="email">Email:</label>
        <Input id="email" />
      </FormGroup>
      <FormGroup>
        <label htmlFor="password">Password:</label>
        <Input id="password" type="password" />
      </FormGroup>
      <div>
        {React.cloneElement(
          submitButton,
          { type: 'submit' },
          ...(Array.isArray(submitButton.props.children)
            ? submitButton.props.children
            : [submitButton.props.children]),
          isLoading ? <Spinner css={{ marginLeft: 5 }} /> : null
        )}
      </div>
      {isError ? <ErrorMessage errorMessage={errorMessage} /> : null}
    </form>
  )
}

function UnauthenticatedApp({ handleSignUp, handleLogin }) {
  return (
    <div
      css={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100vh',
      }}
    >
      <h1>Tu es!</h1>
      <div
        css={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
          gridGap: '0.75rem',
        }}
      >
        <Modal>
          <ModalOpenButton>
            <Button variant="primary">Login</Button>
          </ModalOpenButton>
          <ModalContents aria-label="Login form" title="Login">
            <LoginForm
              onSubmit={handleLogin}
              submitButton={<Button variant="primary">Login</Button>}
            />
          </ModalContents>
        </Modal>
        <Modal>
          <ModalOpenButton>
            <Button variant="secondary">Register</Button>
          </ModalOpenButton>
          <ModalContents aria-label="Register form" title="Register">
            <LoginForm
              onSubmit={handleSignUp}
              submitButton={<Button variant="primary">Register</Button>}
            />
          </ModalContents>
        </Modal>
      </div>
    </div>
  )
}

export default UnauthenticatedApp
