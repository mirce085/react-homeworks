import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchTaskByIdAsync, updateTaskAsync } from "../redux/slices/tasksSlice";

export default function EditContact() {
    const { taskId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const task = useSelector((state) =>
        state.tasks.items.find((task) => task.id === taskId)
    );

    const [formState, setFormState] = useState({
        name: "",
        text: "",
    });

    useEffect(() => {
        if (task) {
            setFormState({
                name: task.name || "",
                text: task.text || "",
            });
        } else {
            dispatch(fetchTaskByIdAsync(taskId));
        }
    }, [task, taskId, dispatch]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(updateTaskAsync({ id: taskId, updates: formState })).unwrap();
            navigate(`/tasks/${taskId}/`);
        } catch (error) {
            console.error("Failed to update task:", error);
        }
    };

    if (!task) {
        return <div>Loading...</div>;
    }

    return (
        <form id="task-form" onSubmit={handleFormSubmit}>
            <p>
                <span>Name</span>
                <input
                    placeholder="Name"
                    aria-label="Name"
                    type="text"
                    name="name"
                    value={formState.name}
                    onChange={handleInputChange}
                />
            </p>
            <label>
                <span>Text</span>
                <textarea
                    name="text"
                    value={formState.text}
                    rows={10}
                    onChange={handleInputChange}
                />
            </label>
            <p>
                <button type="submit">Save</button>
                <button
                    type="button"
                    onClick={() => navigate(`/tasks/${taskId}/`)}
                >
                    Cancel
                </button>
            </p>
        </form>
    );
}
