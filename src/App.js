import { useEffect, useState } from 'react'
import Todo from './components/Todo'
import FormTodo from './components/FormTodo'

function App() {
  const [todos, setTodos] = useState([])
  const [calling, setCalling] = useState(0)
  const [task, setTask] = useState('create')

  useEffect(() => {
    fetch('https://todo-app-bravo680.herokuapp.com/getAllTodos')
    .then(res => res.json())
    .then(data => setTodos(data))
    .catch(err => console.log("error:", err))
  },[calling])

  return (
    <>
      <h1>Todo app</h1>
      {
        todos.map((todo, index) => 
          <Todo todo={todo} key={index} taskState={[task, setTask]}  setCalling={setCalling}/>
          )
      }
      <FormTodo create taskState={[task, setTask]} setCalling={setCalling}/>
    </>
  )
}

export default App