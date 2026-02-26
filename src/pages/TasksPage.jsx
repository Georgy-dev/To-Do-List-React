import { TasksProvider } from "../context/TasksContext";
import Todo from "../components/Todo";

function TasksPage() {
    return (
        <TasksProvider>
            <Todo />
        </TasksProvider>
    );
}

export default TasksPage;
