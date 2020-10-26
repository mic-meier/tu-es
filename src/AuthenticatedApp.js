/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
import { addTodo, completeTodo, getTodos } from 'utils/firestore'
import { useAsync } from 'utils/hooks'

import { Button } from './components/lib'

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
  const { data: todos, run } = useAsync()

  React.useEffect(() => {
    run(getTodos(user))
  }, [run, user])

  function onAddTodo(e) {
    e.preventDefault()
    run(addTodo(newTodo, todos, user))
    setNewTodo('')
  }

  function onUpdateCompleted(todo) {
    run(completeTodo(todo, todos, user))
  }

  return (
    <React.Fragment>
      <Nav handleLogout={handleLogout} user={user} />
      <form onSubmit={onAddTodo}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </form>
      <div>
        Todo:
        {todos
          ? todos
              .filter((todo) => todo.data.completed === false)
              .map((todo) => {
                return (
                  <div key={todo.id}>
                    {todo.data.task}{' '}
                    <Button onClick={() => onUpdateCompleted(todo)}>
                      Complete
                    </Button>
                  </div>
                )
              })
          : null}
      </div>
      <div>
        Completed:
        {todos
          ? todos
              .filter((todo) => todo.data.completed === true)
              .map((todo) => {
                return (
                  <div key={todo.id}>
                    {todo.data.task}{' '}
                    <Button onClick={() => onUpdateCompleted(todo)}>
                      Unomplete
                    </Button>
                  </div>
                )
              })
          : null}
      </div>
    </React.Fragment>
  )
}

export default AuthenticatedApp
