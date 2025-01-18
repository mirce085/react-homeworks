import { Form, redirect, useLoaderData, useNavigate } from 'react-router-dom';
import { updateTask } from '../tasks';

export async function action({request, params}) {
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);
    await updateTask(params.taskId, updates);
    return redirect(`/tasks/${params.taskId}`);
}

export default function EditContact() {
    const {task} = useLoaderData();
    const navigate = useNavigate();
    
    return (
        <Form method="post" id="task-form">
            <p>
                <span>Name</span>
                <input
                    placeholder="Name"
                    aria-label="Name"
                    type="text"
                    name="name"
                    defaultValue={task?.name}
                />
            </p>
            <label>
                <span>Text</span>
                <textarea
                    name="text"
                    defaultValue={task?.text}
                    rows={10}
                />
            </label>
            <p>
                <button type="submit">Save</button>
                <button
                    type="button"
                    onClick={() => {
                        navigate(`/tasks/${task.id}/`);
                    }}
                >
                    Cancel
                </button>
            </p>
        </Form>
    );
}
