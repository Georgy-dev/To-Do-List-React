import AddTaskForm from "./AddTaskForm";
import SearchTaskForm from "./SearchTaskForm";
import TodoInfo from "./TodoInfo";
import TodoList from "./TodoList";

function Todo() {
    const tasks = [
        { id: "task1", title: "Learn React", isDone: false },
        { id: "task2", title: "Learn JS", isDone: true },
    ];

    return (
        <div className="todo">
            <h1 className="todo__title">To Do List</h1>
            <AddTaskForm />
            <SearchTaskForm />
            <TodoInfo
                total={tasks.length}
                done={tasks.filter(({ isDone }) => isDone).length}
            />
            <TodoList tasks={tasks} />
        </div>
    );
}

export default Todo;
