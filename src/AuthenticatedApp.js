/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'

import { Button } from './components/lib'
import fb from './firebase'

const db = fb.firestore()

function Nav({ handleLogout, user }) {
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
  const [newTodo, setNewTodo] = React.useState('')
  const [todos, setTodos] = React.useState(null)

  React.useEffect(() => {
    db.collection(user.uid)
      .get()
      .then((querySnapshot) => {
        const docsArr = []
        querySnapshot.forEach((doc) => {
          docsArr.push({ data: doc.data(), id: doc.id })
        })
        setTodos(docsArr)
      })
      .catch((e) => console.log('Error: ', e))
  }, [])

  function handleSubmit() {
    db.collection(user.uid)
      .add({
        task: newTodo,
        completed: false,
      })
      .then((docRef) => {
        console.log('Document written with ID: ', docRef.id)
      })
      .catch((error) => {
        console.error('Error adding document: ', error)
      })
    setNewTodo('')
  }

  return (
    <React.Fragment>
      <Nav handleLogout={handleLogout} user={user} />
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <Button variant="primary" onClick={handleSubmit}>
        Submit
      </Button>
      {todos
        ? todos.map((todo) => <div key={todo.id}>{todo.data.task}</div>)
        : null}
    </React.Fragment>
  )
}

export default AuthenticatedApp
