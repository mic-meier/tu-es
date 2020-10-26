import fb from '../firebase'

const db = fb.firestore()

async function addTodo(task, todos, user) {
  try {
    const todoRef = await db
      .collection(`users/${user.uid}/todos`)
      .add({ task, completed: false })
    const createdTodo = await todoRef.get()
    const data = createdTodo.data()
    return [...todos, { data, id: todoRef.id }]
  } catch (e) {
    console.error('Error adding document: ', e)
  }
}

async function completeTodo(todo, todos, user) {
  const docRef = db.doc(`users/${user.uid}/todos/${todo.id}`)
  const isCompleted = !todo.data.completed

  try {
    await docRef.update({ completed: isCompleted })
    const updatedTodo = await docRef.get()
    const updatedTodoData = updatedTodo.data()
    return todos.map((todo) =>
      todo.id === updatedTodo.id
        ? { data: updatedTodoData, id: updatedTodo.id }
        : todo
    )
  } catch (e) {
    console.error('Error updating document ', e)
  }
}

async function getTodos(user) {
  try {
    const querySnapshot = await db.collection(`users/${user.uid}/todos`).get()
    const docsArr = []
    querySnapshot.forEach((doc) => {
      docsArr.push({ data: doc.data(), id: doc.id })
    })
    return docsArr
  } catch (e) {
    console.error('Error getting todos ', e)
  }
}

export { addTodo, completeTodo, getTodos }
