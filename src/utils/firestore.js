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

export { addTodo }
