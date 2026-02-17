import Button from "./Button";
import Field from "./Field";

function AddTaskForm({ addTask, newTaskTitle, setNewTaskTitle }) {
    const onSubmit = (event) => {
        event.preventDefault();

        addTask();
    };

    return (
        <form className="todo__form" onSubmit={onSubmit}>
            <Field
                className="todo__field"
                label="New task title"
                id="new-task"
                value={newTaskTitle}
                onInput={(event) => {
                    setNewTaskTitle(event.target.value);
                }}
            />
            <Button type="submit">Add</Button>
        </form>
    );
}

export default AddTaskForm;
