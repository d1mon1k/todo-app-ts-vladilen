import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'
import { ITodo } from './interfaces'

const App: React.FC = () => {
  const [tasks, setTasks] = useState<ITodo[]>([])

  useEffect(() => {
    const saveTasks = JSON.parse(
      localStorage.getItem('tasks') || '[]'
    ) as ITodo[]

    setTasks(saveTasks)
  }, []) //note если установлен второй параметр - [] - значит эффект сработает только 1 раз и всё.

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  const addHandler = (title: string): void => {
    const newTodo: ITodo = {
      id: Date.now(),
      title: title,
      completed: false,
    }
    setTasks((prev) => [newTodo, ...prev])
  }

  const changeHandler = (id: number): void => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id === id) {
          task.completed = !task.completed
        }
        return task
      })
    )
  }

  const removeHandler = (id: number): void => {
    setTasks((prev) => prev.filter((task) => task.id !== id))
  }

  return (
    <>
      <Navbar />
      <div className="container">
        <TodoForm onAdd={addHandler} />
        <TodoList
          tasks={tasks}
          onChange={changeHandler}
          onRemove={removeHandler}
        />
      </div>
    </>
  )
}

export default App
