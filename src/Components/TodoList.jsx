import React from 'react';
import { useSelector } from 'react-redux';
import TodoItem from './TodoItem';

const TodoList = () => {
    const { todos, error, isLoading } = useSelector((state => state.todos))
    // console.log(todos);

    if (isLoading) {
        return <h1>Loading...</h1>
    }
    return (
        <div>
            {
                todos.length > 0 && !error ?
                    todos.map(todo => (
                        <TodoItem key={todo.id} todo={todo} />
                    ))
                    :
                    <h2>An error occured: {error}</h2>
            }
        </div>
    );
};

export default TodoList;