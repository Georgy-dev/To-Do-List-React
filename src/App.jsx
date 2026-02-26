import Router from "./Router";
import TasksPage from "./pages/TasksPage";
import TaskPage from "./pages/TaskPage";

function App() {
    const routes = {
        "/": TasksPage,
        "/tasks/:id": TaskPage,
        "*": () => {
            return (
                <div>
                    <h1>404 Error</h1>
                    <p>Page is not found</p>
                </div>
            );
        },
    };

    return <Router routes={routes} />;
}

export default App;
