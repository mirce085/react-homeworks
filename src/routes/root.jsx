import { Form, NavLink, Outlet, redirect, useLoaderData, useNavigation, useSubmit } from 'react-router-dom';
import {createTask, getTasks, updateTask} from '../tasks';
import { useEffect } from 'react';
import {useDispatch, useSelector} from "react-redux";
import {setTasks} from "../redux/slices/tasksSlice";
import {store} from "../redux/store";

export async function action() {
    const task = await createTask();
    
    return redirect(`/tasks/${task.id}/edit`);
}

export async function loader({ request }) {
    const url = new URL(request.url);
    const q = url.searchParams.get("q");

    const tasks = await getTasks(q);
    return {tasks, q};
}

export default function Root() {
    const {tasks, q} = useLoaderData();
    const navigation = useNavigation();
    const submit = useSubmit();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setTasks(tasks)); // Hydrate Redux store
    }, [tasks, dispatch]);

    useEffect(() => {
        document.getElementById("q").value = q;
    }, [q]);
    
    return (
        <>
            <div id="sidebar">
                <h1>Tasks</h1>
                <div>
                    <Form id="search-form" role="search">
                        <input
                            id="q"
                            aria-label="Search tasks"
                            placeholder="Search"
                            type="search"
                            name="q"
                            defaultValue={q}
                            onChange={(event) => {
                                submit(event.currentTarget.form);
                            }}
                        />
                        <div
                            id="search-spinner"
                            aria-hidden
                            hidden={true}
                        />
                        <div
                            className="sr-only"
                            aria-live="polite"
                        ></div>
                    </Form>
                    <Form method="post">
                        <button type="submit">New</button>
                    </Form>
                </div>
                <div id="filter-buttons">
                    <button>All</button>
                    <button>Done</button>
                    <button>Undone</button>
                </div>
                <nav>
                    {tasks.length ? (
                        <ul>
                            {tasks.map((task) => (
                                <li key={task.id}>
                                    <NavLink
                                        to={`tasks/${task.id}`}
                                        className={({isActive, isPending}) =>
                                            isActive
                                                ? 'active'
                                                : isPending
                                                    ? 'pending'
                                                    : ''
                                        }
                                    >
                                        {task.name ? (
                                            <>
                                                {task.name}
                                            </>
                                        ) : (
                                            <i>No Name</i>
                                        )}{' '}
                                        <div>
                                            <label>Done</label>
                                            <input type={"checkbox"} checked={task.isDone} onChange={() =>
                                            {
                                                updateTask(task.id, {isDone : !task.isDone});
                                            }}/>
                                        </div>
                                        <div>
                                            <Form action={`/tasks/${task.id}/edit`}>
                                                <button type="submit" onClick={(e) => e.stopPropagation()}>Edit</button>
                                            </Form>
                                            <Form
                                                method="post"
                                                action={`/tasks/${task.id}/destroy`}
                                                onSubmit={(event) => {
                                                    if (
                                                        !window.confirm(
                                                            'Please confirm you want to delete this record.',
                                                        )
                                                    ) {
                                                        event.preventDefault();
                                                    }
                                                }}
                                            >
                                                <button type="submit" onClick={(e) => e.stopPropagation()}>Delete</button>
                                            </Form>
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
            <div
                id="detail"
                className={
                    navigation.state === 'loading' ? 'loading' : ''
                }
            >
                <Outlet/>
            </div>
        </>
    );
}
