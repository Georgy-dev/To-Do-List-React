import TodoItem from "./TodoItem";

function TodoList({ tasks = [] }) {
    const hasTasks = tasks.length !== 0;

    if (!hasTasks) {
        return <div className="todo__empty-message"></div>;
    }

    return (
        <ul className="todo__list">
            {tasks.map((task) => (
                <TodoItem
                    className="todo__item"
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
