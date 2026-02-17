import AddTaskForm from "./AddTaskForm";
import SearchTaskForm from "./SearchTaskForm";
import TodoInfo from "./TodoInfo";
import TodoList from "./TodoList";

function Todo() {
    const tasks = [
        { id: "task1", title: "Learn React", isDone: false },
        { id: "task2", title: "Learn JS", isDone: true },
    ];

    const deleteAllTasks = () => {
        console.log("Delete");
    };

    const deleteTask = (taskId) => {
        console.log("Delete Id Task", taskId);
    };

    const toggleTaskComplete = (taskId, isDone) => {
        console.log(taskId, isDone ? "done" : "not done");
    };

    const filterTasks = (query) => {
        console.log(`Search: ${query}`);
    };

    const addTask = () => {
        console.log("New task added");
    };

    return (
        <div className="todo">
            <h1 className="todo__title">To Do List</h1>
            <AddTaskForm addTask={addTask} />
            <SearchTaskForm onSearchInput={filterTasks} />
            <TodoInfo
                total={tasks.length}
                done={tasks.filter(({ isDone }) => isDone).length}
                onDeleteAllButtonClick={deleteAllTasks}
            />
            <TodoList
                tasks={tasks}
                onDeleteTaskButtonClick={deleteTask}
                onTaskCompleteChange={toggleTaskComplete}
            />
        </div>
    );
}

export default Todo;
