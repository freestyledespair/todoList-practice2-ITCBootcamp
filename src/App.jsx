import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import NewTodoForm from './Components/NewTodoForm';
import TodoList from './Components/TodoList';
import { addTodo, fetchTodos, toggleTodos } from './store/slices/todoSlice';

const App = () => {
  const [text, setText] = useState("")
  const dispatch = useDispatch()


  const addNewTodo = (e) => {
    e.preventDefault()
    if (text.trim().length) {
      // dispatch(addTodo({ text }))
      dispatch(toggleTodos(text))
      setText("")
    }
  }

  useEffect(() => {
    dispatch(fetchTodos())
  }, [dispatch])

  return (
    <div>
      <NewTodoForm
        value={text}
        updateText={setText}
        addNewTodo={addNewTodo}
      />
      <TodoList />
    </div>
  );
};

export default App;