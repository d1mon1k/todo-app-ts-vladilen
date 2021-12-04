import React, {
  KeyboardEventHandler,
  ReactEventHandler,
  useRef,
  useState,
} from 'react'

interface TodoFormProps {
  onAdd: (title: string) => void
}

const TodoForm: React.FunctionComponent<TodoFormProps> = ({ onAdd }) => {
  //note Это первый способ обработки Input
  // const [title, setTitle] = useState<string>("");
  // const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setTitle(event.target.value);
  // };
  // const keyPressHandler = (event: React.KeyboardEvent) => {
  //   if (event.key === "Enter") {
  //     console.log(title);
  //     setTitle("");
  //   }
  // };
  //note ===============1ый===================

  //note Это 2ой способ обработки Input с useRef
  const inputTitle = useRef<HTMLInputElement>(null)
  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    inputTitle.current!.value = event.target.value
  }
  const keyPressHandler = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      onAdd(inputTitle.current!.value)
      inputTitle.current!.value = ''
    }
  }
  //note ===============2ой===================

  return (
    <div className="input-field mt2">
      <input
        //note 1ый способ
        // value={title}
        //note 2ой способ
        ref={inputTitle}
        onChange={changeHandler}
        onKeyPress={keyPressHandler}
        type="text"
        id="title"
        placeholder="Введите название дела"
      />
      <label htmlFor="title" className="active">
        Введите название дела
      </label>
    </div>
  )
}

export default TodoForm
