import { useEffect, useState } from 'react'
import { useAsync } from 'utils/hooks'

import AuthenticatedApp from './AuthenticatedApp'
import { FullPageSpinner } from './components/lib'
import fb from './firebase'
import UnauthenticatedApp from './UnauthenticatedApp'

function App() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const {
    data: user,
    error,
    isLoading,
    isIdle,
    isError,
    isSuccess,
    setData,
    setError,
  } = useAsync()

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const clearInputs = () => {
    setEmail('')
    setPassword('')
  }

  const handleLogin = (e) => {
    e.preventDefault()
    fb.auth()
      .signInWithEmailAndPassword(email, password)
      .catch((error) => {
        switch (error.code) {
          case 'auth/invalid-email':
          case 'auth/user-disabled':
          case 'auth/user-not-found':
            setError(error.message)
            break
          case 'auth/wrong-password':
            setError(error.message)
            break
        }
      })
  }

  const handleSignUp = (e) => {
    e.preventDefault()
    fb.auth()
      .createUserWithEmailAndPassword(email, password)
      .catch((error) => {
        switch (error.code) {
          case 'auth/email-already-in-use':
          case 'auth/invalid-email':
            setError(error.message)
            break
          case 'auth/weak-password':
            setError(error.message)
            break
        }
      })
  }

  const handleLogOut = () => {
    fb.auth().signOut()
  }

  const authListener = async () => {
    await fb.auth().onAuthStateChanged((user) => {
      if (user) {
        clearInputs()
        setData(user)
      } else {
        setData('')
      }
    })
  }

  useEffect(() => {
    authListener()
  }, [])

  if (isLoading || isIdle) {
    return <FullPageSpinner />
  }

  if (isError) {
    return (
      <div
        css={{
          color: 'red',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <p>Uh oh... There&apos;s a problem. Try refreshing the app.</p>
        <pre>{error.message}</pre>
      </div>
    )
  }

  if (isSuccess) {
    return user ? (
      <AuthenticatedApp handleLogout={handleLogOut} />
    ) : (
      <UnauthenticatedApp
        handleEmailChange={handleEmailChange}
        handlePasswordChange={handlePasswordChange}
        handleLogin={handleLogin}
        handleSignUp={handleSignUp}
      />
    )
  }
}

export default App
