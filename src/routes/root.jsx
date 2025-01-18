import React, { useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasksAsync, createTaskAsync, updateTaskAsync, deleteTaskAsync, getDoneTasks } from "../redux/slices/tasksSlice";

export default function Root() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const tasks = useSelector((state) => state.tasks.items);
    const taskStatus = useSelector((state) => state.tasks.status);

    useEffect(() => {
        if (taskStatus === "idle") {
            dispatch(fetchTasksAsync());
        }
    }, [dispatch, taskStatus]);

    const handleNewTask = async () => {
        const task = await dispatch(createTaskAsync()).unwrap();
        navigate(`/tasks/${task.id}/edit`);
    };

    const handleSearch = (event) => {
        const query = event.target.value;
        dispatch(fetchTasksAsync(query));
    };

    const handleUpdateTask = (id, updates) => {
        dispatch(updateTaskAsync({ id, updates }));
    };

    const handleDeleteTask = (id) => {
        if (window.confirm("Please confirm you want to delete this record.")) {
            dispatch(deleteTaskAsync(id));
            navigate(`/`);
        }
    };

    const showAllTasks = () => {
        dispatch(fetchTasksAsync());
        navigate(`/`);
    }

    const showDoneTasks = () => {
        dispatch(getDoneTasks(true));
        navigate(`/`);
    }

    const showUndoneTasks = () => {
        dispatch(getDoneTasks(false));
        navigate(`/`);
    }

    return (
        <>
            <div id="sidebar">
                <h1>Tasks</h1>
                <div>
                    <form id="search-form" role="search" onSubmit={(e) => e.preventDefault()}>
                        <input
                            id="q"
                            aria-label="Search tasks"
                            placeholder="Search"
                            type="search"
                            name="q"
                            onChange={handleSearch}
                        />
                        <div id="search-spinner" aria-hidden hidden={true} />
                        <div className="sr-only" aria-live="polite"></div>
                    </form>
                    <button type="button" onClick={() => handleNewTask()}>New</button>
                </div>
                <div id="filter-buttons">
                    <button onClick={() => showAllTasks()}>All</button>
                    <button onClick={() => showDoneTasks()}>Done</button>
                    <button onClick={() => showUndoneTasks()}>Undone</button>
                </div>
                <nav>
                    {tasks.length ? (
                        <ul>
                            {tasks.map((task) => (
                                <li key={task.id}>
                                    <NavLink
                                        to={`tasks/${task.id}`}
                                        className={({ isActive, isPending }) =>
                                            isActive ? "active" : isPending ? "pending" : ""
                                        }
                                    >
                                        {task.name ? (
                                            <>{task.name}</>
                                        ) : (
                                            <i>No Name</i>
                                        )}
                                        <div>
                                            <label>Done</label>
                                            <input
                                                type="checkbox"
                                                checked={task.isDone}
                                                onChange={() => handleUpdateTask(task.id, { isDone: !task.isDone })}
                                            />
                                        </div>
                                        <div>
                                            <button onClick={(e) => {
                                                e.preventDefault();
                                                navigate(`/tasks/${task.id}/edit`);
                                            }}>Edit</button>
                                            <button onClick={(e) =>
                                            {
                                                e.preventDefault();
                                                handleDeleteTask(task.id);
                                            }
                                            }>Delete</button>
                                        </div>
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>
                            <i>No tasks</i>
                        </p>
                    )}
                </nav>
            </div>
            <div id="detail" className={taskStatus === "loading" ? "loading" : ""}>
                <Outlet />
            </div>
        </>
    );
}
