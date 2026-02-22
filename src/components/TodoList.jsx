import TodoItem from "./TodoItem";

function TodoList({
    tasks = [],
    onDeleteTaskButtonClick,
    onTaskCompleteChange,
    filteredTasks,
    firstIncompleteTaskRef,
    firstIncompleteTaskID,
}) {
    const hasTasks = tasks.length > 0;
    const isEmptyFilteredTasks = filteredTasks?.length === 0; // ? нужен, так как filteredTasks может быть null

    if (!hasTasks) {
        return <div className="todo__empty-message">No tasks</div>;
    }

    if (hasTasks && isEmptyFilteredTasks) {
        return <div className="todo__empty-message">Tasks not found</div>;
    }

    return (
        <ul className="todo__list">
            {(filteredTasks ?? tasks).map((task) => (
                <TodoItem
                    className="todo__item"
                    key={task.id}
                    onDeleteTaskButtonClick={onDeleteTaskButtonClick}
                    onTaskCompleteChange={onTaskCompleteChange}
                    ref={
                        task.id === firstIncompleteTaskID
                            ? firstIncompleteTaskRef
                            : null
                    }
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
