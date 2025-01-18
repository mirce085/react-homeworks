import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchTaskByIdAsync } from "../redux/slices/tasksSlice";

export default function Task() {
    const { taskId } = useParams();
    const dispatch = useDispatch();

    const task = useSelector((state) =>
        state.tasks.items.find((task) => task.id === taskId)
    );
    
    useEffect(() => {
        if (!task) {
            dispatch(fetchTaskByIdAsync(taskId));
        }
    }, [dispatch, taskId, task]);

    if (!task) {
        return <div>Loading...</div>;
    }

    return (
        <div id="task">
            <div>
                <h1>
                    {task.name ? (
                        <>{task.name}</>
                    ) : (
                        <i>No Name</i>
                    )}
                </h1>

                <textarea
                    readOnly={true}
                    name="text"
                    value={task?.text || ""}
                    rows={10}
                />
            </div>
        </div>
    );
}
