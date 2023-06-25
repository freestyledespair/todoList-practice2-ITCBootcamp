import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteTodo, removeTodo, toggleComplete, toggleStatus } from '../store/slices/todoSlice';

const TodoItem = ({ todo }) => {
    const dispatch = useDispatch()
    return (
        <div>
            {/* <input type="checkbox" checked={todo.completed} onChange={() => dispatch(toggleComplete({ id: todo.id }))} /> */}
            <input type="checkbox" checked={todo.completed} onChange={() => dispatch(toggleStatus(todo.id))} />
            <span>{todo.title}</span>
            {/* <span>{todo.text}</span> */}
            {/* <button onClick={() => dispatch(removeTodo({ id: todo.id }))}>&times;</button> */}
            <button onClick={() => dispatch(deleteTodo(todo.id))}>&times;</button>
        </div>
    );
};

export default TodoItem;