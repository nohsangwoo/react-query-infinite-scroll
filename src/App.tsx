import { useEffect, useState } from 'react'
import './App.css'
import TodoCard from './components/TodoCard'
import { todo } from './types/todo'

function App() {

  const [todos, setTodos] = useState<todo[]>([])

  const fetchTodos = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/todos?_page=1')
    const data = await res.json()
    setTodos(data)
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  console.log(todos)
  return (
    <div className='app'>
      {todos.map((todo, index) => {
        return <div key={todo.id}><TodoCard todo={todo} /></div>
      })}
    </div>
  )
}

export default App
