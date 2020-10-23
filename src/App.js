import { useEffect, useState } from 'react'

import fb from './firebase'

function App() {
  const [user, setUser] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [hasAccount, setHasAccount] = useState(false)

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

  const clearErrors = () => {
    setEmailError('')
    setPasswordError('')
  }

  const handleLogin = (e) => {
    e.preventDefault()
    clearErrors()
    fb.auth()
      .signInWithEmailAndPassword(email, password)
      .catch((error) => {
        switch (error.code) {
          case 'auth/invalid-email':
          case 'auth/user-disabled':
          case 'auth/user-not-found':
            setEmailError(error.message)
            break
          case 'auth/wrong-password':
            setPasswordError(error.message)
            break
        }
      })
  }

  const handleSignUp = (e) => {
    e.preventDefault()
    clearErrors()
    fb.auth()
      .createUserWithEmailAndPassword(email, password)
      .catch((error) => {
        switch (error.code) {
          case 'auth/email-already-in-use':
          case 'auth/invalid-email':
            setEmailError(error.message)
            break
          case 'auth/weak-password':
            setPasswordError(error.message)
            break
        }
      })
  }

  const handleLogOut = () => {
    fb.auth().signOut()
  }

  const authListener = () => {
    fb.auth().onAuthStateChanged((user) => {
      if (user) {
        clearInputs()
        setUser(user)
      } else {
        setUser('')
      }
    })
  }

  useEffect(() => {
    authListener()
  }, [])

  return (
    <>
      <div>Hello</div>
      <div>Sign up:</div>
      <form onSubmit={handleSignUp}>
        <div>
          <label htmlFor="email">Email: </label>
          <input
            id="email"
            type="text"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">Email: </label>
          <input
            id="email"
            type="text"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
      <div>{user ? 'logged in' : 'not logged in'}</div>
      <button onClick={handleLogOut}>Log out</button>
    </>
  )
}

export default App
