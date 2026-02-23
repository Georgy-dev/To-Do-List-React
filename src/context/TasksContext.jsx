import {
    createContext,
    useEffect,
    useState,
    useRef,
    useCallback,
    useMemo,
} from "react";

export const TasksContext = createContext({});

export function TasksProvider({ children }) {
    const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem("tasks");

        if (savedTasks) {
            return JSON.parse(savedTasks);
        }

        return [
            { id: "task1", title: "Learn React", isDone: false },
            { id: "task2", title: "Learn JS", isDone: true },
        ];
    });

    const [newTaskTitle, setNewTaskTitle] = useState("");

    const [searchQuery, setSearchQuery] = useState("");

    const newTaskInputRef = useRef(null);
    const firstIncompleteTaskRef = useRef(null);
    const firstIncompleteTaskID = tasks.find((item) => !item.isDone)?.id; // ?. для безопасности, вдруг у нас такого элемента нет

    const deleteAllTasks = useCallback(() => {
        const isConfirmed = confirm(
            "Вы уверены, что хотите удалить все задачи?",
        );

        if (isConfirmed) {
            setTasks([]);
        }
    }, []);

    const deleteTask = useCallback(
        (taskId) => {
            setTasks(tasks.filter((task) => task.id !== taskId));
        },
        [tasks],
    );

    const toggleTaskComplete = useCallback(
        (taskId, isDone) => {
            setTasks(
                tasks.map((task) => {
                    if (task.id === taskId) {
                        return { ...task, isDone };
                    }

                    return task;
                }),
            );
        },
        [tasks],
    );

    const addTask = useCallback(() => {
        if (newTaskTitle.trim().length > 0) {
            const newTask = {
                id: crypto?.randomUUID() ?? Date.now().toString(),
                title: newTaskTitle,
                isDone: false,
            };

            setTasks((prevTasks) => [...prevTasks, newTask]);

            setNewTaskTitle(""); // как form.reset()

            setSearchQuery(""); // чтобы после переключения с поиска на добавление новой задачи поисковая строка была пустой

            newTaskInputRef.current.focus();
        }
    }, [newTaskTitle]);

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    useEffect(() => {
        newTaskInputRef.current.focus();
    }, []);

    const filteredTasks = useMemo(() => {
        const clearSearchQuery = searchQuery.trim().toLowerCase();

        return clearSearchQuery.length > 0
            ? tasks.filter(({ title }) =>
                  title.toLowerCase().includes(clearSearchQuery),
              )
            : null;
    }, [searchQuery, tasks]);

    return (
        <TasksContext.Provider
            value={{
                tasks,
                filteredTasks,
                firstIncompleteTaskRef,
                firstIncompleteTaskID,
                deleteAllTasks,
                deleteTask,
                toggleTaskComplete,

                newTaskTitle,
                setNewTaskTitle,
                searchQuery,
                setSearchQuery,
                newTaskInputRef,
                addTask,
            }}
        >
            {children}
        </TasksContext.Provider>
    );
}
