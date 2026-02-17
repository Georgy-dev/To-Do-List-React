import Button from "./Button";
import Field from "./Field";

function AddTaskForm() {
    return (
        <form className="todo__form">
            <Field
                className="todo__field"
                label="New task title"
                id="new-task"
            />
            <Button type="submit">Add</Button>
        </form>
    );
}

export default AddTaskForm;
