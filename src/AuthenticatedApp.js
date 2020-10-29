/** @jsxRuntime classic */
/** @jsx jsx */
import 'twin.macro'

import { jsx } from '@emotion/core'
import React from 'react'
import { addTodo, completeTodo, getTodos } from 'utils/firestore'
import { useAsync } from 'utils/hooks'

import { Button, TodoInput } from './components/lib'

function Nav({ handleLogout, user }) {
  return (
    <nav tw="w-screen flex justify-between py-2 px-4 mb-10 text-neutral-900">
      <h2 tw="py-2 m-0">Tu Es</h2>
      <div>
        <span tw="py-0 px-4">{user.email}</span>
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
    <div tw="h-screen w-screen text-neutral-900">
      <Nav handleLogout={handleLogout} user={user} />
      <div tw="flex justify-center items-center">
        <form
          onSubmit={onAddTodo}
          tw="flex items-center justify-center w-screen"
        >
          <TodoInput
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
        </form>
      </div>
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
    </div>
  )
}

export default AuthenticatedApp
