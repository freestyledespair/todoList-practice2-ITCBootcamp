import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTodos = createAsyncThunk(
    'todos/fetchTodos',
    async (_, { rejectWithValue }) => {
        try {
            const res = await axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10')
            // console.log(res);
            if (res.status !== 200) {
                throw new Error('Server Error')
            }
            return res.data
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const deleteTodo = createAsyncThunk(
    'todos/deleteTodo',
    async (id, { rejectWithValue, dispatch }) => {
        try {
            const res = await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
            if (res.status != 200) {
                throw new Error("Can\"t delete task. Server error")
            }
            dispatch(removeTodo({ id }))
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const toggleStatus = createAsyncThunk(
    "todos/toggleStatus",
    async (id, { rejectWithValue, dispatch, getState }) => {
        const todo = getState().todos.todos.find(el => el.id == id)
        try {
            // const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
            //     method: "PATCH",
            //     headers: {
            //         "Content-Type": "application/json"
            //     },
            //     body: JSON.stringify({
            //         completed: !todo.completed
            //     })
            // }
            // )

            const res = await axios.patch(`https://jsonplaceholder.typicode.com/todos/${id}`, { completed: !todo.completed })

            // console.log(res);
            if (res.status !== 200) {
                throw new Error("Can't change status. Server Error")
            }
            // const data = await res.json()
            // console.log(data);

            dispatch(toggleComplete({ id }))
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const toggleTodos = createAsyncThunk(
    'todos/toggleTodos',
    async (text, { rejectWithValue, dispatch }) => {
        try {
            const todo = {
                completed: false,
                title: text,
                userId: 1,
            }
            const res = await axios.post(`https://jsonplaceholder.typicode.com/todos`, todo)
            console.log(res);
            if (res.status !== 201) {
                throw new Error("Cant\"t add task. Server error")
            }
            dispatch(addTodo(res.data))
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)



const todoSlice = createSlice({
    name: 'todos',
    initialState: {
        todos: [],
        error: null,
        isLoading: false,
    },
    reducers: {
        addTodo(state, action) {
            // state.todos.push({
            //     id: new Date().toISOString(),
            //     completed: false,
            //     text: action.payload.text,
            // })
            state.todos.push(action.payload)
        },
        toggleComplete(state, action) {
            const toggledTodo = state.todos.find(todo => todo.id === action.payload.id)
            toggledTodo.completed = !toggledTodo.completed
        },
        removeTodo(state, action) {
            state.todos = state.todos.filter(todo => todo.id !== action.payload.id)
        },
    },

    extraReducers: (builder) => {
        builder.addCase(fetchTodos.pending, (state, action) => {
            state.isLoading = true
            state.error = null
        })
        builder.addCase(fetchTodos.fulfilled, (state, action) => {
            state.isLoading = false
            state.todos = action.payload
        })
        builder.addCase(fetchTodos.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
        })
        builder.addCase(deleteTodo.pending, (state) => {
            state.isLoading = true
            state.error = null
        })
        builder.addCase(deleteTodo.fulfilled, (state, action) => {
            state.isLoading = false
        })
        builder.addCase(deleteTodo.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
        })
        builder.addCase(toggleStatus.pending, (state) => {
            state.isLoading = true
            state.error = null
        })
        builder.addCase(toggleStatus.fulfilled, (state, action) => {
            state.isLoading = false
        })
        builder.addCase(toggleStatus.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
        })
        builder.addCase(toggleTodos.pending, (state) => {
            state.isLoading = true
            state.error = null
        })
        builder.addCase(toggleTodos.fulfilled, (state, action) => {
            state.isLoading = false
        })
        builder.addCase(toggleTodos.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
        })
    }
})

// export const { addTodo, toggleComplete, removeTodo } = todoSlice.actions
const { addTodo, toggleComplete, removeTodo } = todoSlice.actions


export default todoSlice.reducer