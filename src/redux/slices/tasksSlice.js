import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Task from "../../models/Task";

export const fetchTasksAsync = createAsyncThunk(
    "tasks/fetchTasks",
    async (query, { rejectWithValue }) => {
        try {
            let tasks = localStorage.getItem("tasks");
            if (!tasks) {
                localStorage.setItem("tasks", JSON.stringify([]));
                return [];
            }

            tasks = JSON.parse(tasks);
            if (query) {
                tasks = tasks.filter(task => task.name.toLowerCase().includes(query.toLowerCase()));
            }
            return tasks;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchTaskByIdAsync = createAsyncThunk(
    "tasks/fetchTaskById",
    async (taskId, { rejectWithValue }) => {
        try {
            const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
            const task = tasks.find((t) => t.id === taskId);
            if (!task) {
                throw new Error("Task not found");
            }
            return task;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);


export const createTaskAsync = createAsyncThunk(
    "tasks/createTask",
    async (_, { rejectWithValue }) => {
        try {
            let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
            let id = Math.random().toString(36).substring(2, 9);

            let task = new Task(id);
            tasks.unshift(task);

            localStorage.setItem("tasks", JSON.stringify(tasks));
            return task;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const updateTaskAsync = createAsyncThunk(
    "tasks/updateTask",
    async ({ id, updates }, { rejectWithValue }) => {
        try {
            let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
            let index = tasks.findIndex(task => task.id === id);

            if (index === -1) throw new Error("Task not found");

            console.log(tasks[index]);

            Object.assign(tasks[index], updates);

            console.log(tasks[index]);

            localStorage.setItem("tasks", JSON.stringify(tasks));
            return tasks[index];
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const deleteTaskAsync = createAsyncThunk(
    "tasks/deleteTask",
    async (id, { rejectWithValue }) => {
        try {
            let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
            let index = tasks.findIndex(task => task.id === id);

            if (index > -1) {
                tasks.splice(index, 1);
                localStorage.setItem("tasks", JSON.stringify(tasks));
                return id;
            } else {
                throw new Error("Task not found");
            }
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const getDoneTasks = createAsyncThunk(
    "tasks/getDoneTasks",
    async (done, { rejectWithValue }) => {
        try {
            let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
            tasks = tasks.filter(task => task.isDone === done);
            console.log(tasks);
            return tasks;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const tasksSlice = createSlice({
    name: "tasks",
    initialState: {
        items: [],
        status: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasksAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchTasksAsync.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.items = action.payload;
            })
            .addCase(fetchTasksAsync.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(createTaskAsync.fulfilled, (state, action) => {
                state.items.unshift(action.payload);
            })
            .addCase(updateTaskAsync.fulfilled, (state, action) => {
                const index = state.items.findIndex(task => task.id === action.payload.id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            })
            .addCase(deleteTaskAsync.fulfilled, (state, action) => {
                state.items = state.items.filter(task => task.id !== action.payload);
            })
            .addCase(getDoneTasks.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getDoneTasks.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.items = action.payload;
                console.log(state.items);
            })
            .addCase(getDoneTasks.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });
    },
});

export default tasksSlice.reducer;
