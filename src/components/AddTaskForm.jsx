import Button from "./Button";
import Field from "./Field";

function AddTaskForm() {
    return (
        <form className="todo__form">
            <Field />
            <Button />
        </form>
    );
}

export default AddTaskForm;
