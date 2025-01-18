import { useLoaderData } from 'react-router-dom';
import { getTask } from '../tasks';

export async function loader({params}) {
    const task = await getTask(params.taskId);
    
    return {task};
}

export default function Task() {
    const {task} = useLoaderData();

    return (
        <div id="task">
            <div>
                <h1>
                    {task.name ? (
                        <>
                            {task.name}
                        </>
                    ) : (
                        <i>No Name</i>
                    )}{' '}
                </h1>

                <textarea
                    readOnly={true}
                    name="text"
                    value={task?.text}
                    rows={10}
                />

            </div>
        </div>
    );
}

