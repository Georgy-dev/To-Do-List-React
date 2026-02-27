import { useContext } from "react";

import { TodoItem, TasksContext } from "@/entities/todo";

function TodoList({ styles }) {
    const { tasks, filteredTasks } = useContext(TasksContext);

    const hasTasks = tasks.length > 0;
    const isEmptyFilteredTasks = filteredTasks?.length === 0; // ? нужен, так как filteredTasks может быть null

    if (!hasTasks) {
        return <div className={styles.emptyMessage}>No tasks</div>;
    }

    if (hasTasks && isEmptyFilteredTasks) {
        return <div className={styles.emptyMessage}>Tasks not found</div>;
    }

    return (
        <ul className={styles.list}>
            {(filteredTasks ?? tasks).map((task) => (
                <TodoItem
                    className={styles.item}
                    key={task.id}
                    {...task} // так же, как и снизу, только короче

                    // id={task.id}
                    // title={task.title}
                    // isDone={task.isDone}
                />
            ))}
        </ul>
    );
}

export default TodoList;
