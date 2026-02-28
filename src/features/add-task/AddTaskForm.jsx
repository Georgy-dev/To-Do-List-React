import { useContext, useState } from "react";

import Button from "@/shared/ui/Button";
import Field from "@/shared/ui/Field";
import { TasksContext } from "@/entities/todo";

function AddTaskForm({ styles }) {
    const { addTask, newTaskInputRef } = useContext(TasksContext);

    const [newTaskTitle, setNewTaskTitle] = useState("");

    const [error, setError] = useState("");

    const clearNewTaskTitle = newTaskTitle.trim();
    const isNewTaskTitleEmpty = clearNewTaskTitle.length === 0;

    const onSubmit = (event) => {
        event.preventDefault();

        if (!isNewTaskTitleEmpty) {
            addTask(clearNewTaskTitle, () => setNewTaskTitle(""));
        }
    };

    const onInput = (event) => {
        const { value } = event.target;

        const clearValue = value.trim();
        const hasOnlySpaces = value.length > 0 && clearValue.length === 0;

        setNewTaskTitle(value);

        setError(hasOnlySpaces ? "The task cannot be empty" : "");
    };

    return (
        <form className={styles.form} onSubmit={onSubmit}>
            <Field
                className={styles.Field}
                label="New task title"
                id="new-task"
                value={newTaskTitle}
                onInput={onInput}
                ref={newTaskInputRef}
                error={error}
            />
            <Button type="submit" isDisabled={isNewTaskTitleEmpty}>
                Add
            </Button>
        </form>
    );
}

export default AddTaskForm;
