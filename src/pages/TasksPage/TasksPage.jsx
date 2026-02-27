import { TasksProvider } from "@/entities/todo";
import Todo from "@/widgets/Todo";

function TasksPage() {
    return (
        <TasksProvider>
            <Todo />
        </TasksProvider>
    );
}

export default TasksPage;
