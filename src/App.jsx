import Todo from "./components/Todo";
import { TasksProvider } from "./context/TasksContext";

function App() {
    return (
        <TasksProvider>
            <Todo />
        </TasksProvider>
    );
}

export default App;
