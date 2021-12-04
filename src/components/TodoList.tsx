import React from 'react'
import { ITodo } from '../interfaces'

declare var confirm: (question: string) => boolean

type TodoListProps = {
  tasks: ITodo[]
  onChange: (id: number) => void
  onRemove: (id: number) => void
}

const TodoList: React.FC<TodoListProps> = ({ tasks, onChange, onRemove }) => {
  if (!tasks.length) {
    return <p className="center">У вас пока нет задач</p>
  }

  return (
    <ul>
      {tasks.map((task) => {
        const classes = ['todo']
        if (task.completed) {
          classes.push('completed')
        }

        const clickHandler = (event: React.MouseEvent): void => {
          event.preventDefault()
          const shouldRemove = confirm('Вы уверены, что хотите удалить?')
          if (shouldRemove) {
            onRemove(task.id)
          }
        }

        return (
          <li key={task.id} className={classes.join(' ')}>
            <label>
              <input
                onChange={() => onChange(task.id)}
                type="checkbox"
                checked={task.completed}
              />
              <span>{task.title}</span>
              <i onClick={clickHandler} className="material-icons red-text">
                delete
              </i>
            </label>
          </li>
        )
      })}
    </ul>
  )
}

export default TodoList
