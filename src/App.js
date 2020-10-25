import { useEffect } from 'react'
import { useAsync } from 'utils/hooks'

import AuthenticatedApp from './AuthenticatedApp'
import { FullPageSpinner } from './components/lib'
import fb from './firebase'
import UnauthenticatedApp from './UnauthenticatedApp'

// const db = fb.firestore()

function App() {
  const {
    data: user,
    error,
    isLoading,
    isIdle,
    isError,
    isSuccess,
    setData,
  } = useAsync()

  const handleLogin = async ({ email, password }) => {
    await fb
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((error) => {
        return Promise.reject(error)
      })
  }

  const handleSignUp = async ({ email, password }) => {
    await fb
      .auth()
      .createUserWithEmailAndPassword(email, password)
      // .then((cred) => {
      //   return db.collection('users').doc(cred.user.uid).collection('todos')
      // })
      .catch((error) => {
        return Promise.reject(error)
      })
  }

  const handleLogOut = () => {
    fb.auth().signOut()
  }

  const authListener = async () => {
    await fb.auth().onAuthStateChanged((user) => {
      if (user) {
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
      <AuthenticatedApp handleLogout={handleLogOut} user={user} />
    ) : (
      <UnauthenticatedApp
        handleLogin={handleLogin}
        handleSignUp={handleSignUp}
      />
    )
  }
}

export default App
