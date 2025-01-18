import { redirect } from "react-router-dom";
import { deleteTask, getTask } from '../tasks';

export async function action({ params }) {
    const task = await getTask(params.taskId);
    
    if (task === null) {
        console.log('no task');
        throw new Error(`Could not find task`);
    }
    
    await deleteTask(params.taskId);
    
    return redirect("/");
}
