import React from 'react';
import "./NewTodoForm.css"

const NewTodoForm = ({ updateText, value, addNewTodo }) => {
    return (
        <div>
            <form onSubmit={addNewTodo}>
                <input type="text"
                    placeholder='new todo'
                    value={value}
                    onChange={(e) => updateText(e.target.value)}
                />
                <button>Add ToDo</button>
            </form>
        </div>
    );
};

export default NewTodoForm;