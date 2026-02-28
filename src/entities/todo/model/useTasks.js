import {
    useState,
    useEffect,
    useRef,
    useCallback,
    useMemo,
    useReducer,
} from "react";

import tasksAPI from "@/shared/api/tasks";

const tasksReducer = (state, action) => {
    switch (action.type) {
        case "SET_ALL": {
            return Array.isArray(action.task) ? action.task : state;
        }
        case "ADD": {
            return [...state, action.task];
        }
        case "TOGGLE_COMPLETE": {
            const { id, isDone } = action;

            return state.map((task) => {
                return task.id === id ? { ...task, isDone } : task;
            });
        }
        case "DELETE": {
            return state.filter((task) => task.id !== action.id);
        }
        case "DELETE_ALL": {
            return [];
        }
        default: {
            return state;
        }
    }
};

function useTasks() {
    const [tasks, dispatch] = useReducer(tasksReducer, []);

    const [newTaskTitle, setNewTaskTitle] = useState("");

    const [searchQuery, setSearchQuery] = useState("");

    const [disappearingTaskID, setDisappearingTaskID] = useState(null);

    const [appearingTaskID, setAppearingTaskID] = useState(null);

    const newTaskInputRef = useRef(null);

    const deleteAllTasks = useCallback(() => {
        const isConfirmed = confirm(
            "Вы уверены, что хотите удалить все задачи?",
        );

        if (isConfirmed) {
            tasksAPI
                .deleteAll(tasks)
                .then(() => dispatch({ type: "DELETE_ALL" }));
        }
    }, [tasks]);

    const deleteTask = useCallback((taskId) => {
        tasksAPI.delete(taskId).then(() => {
            setDisappearingTaskID(taskId); // запускаем анимацию удаления

            setTimeout(() => {
                dispatch({ type: "DELETE", id: taskId });
                // фильтрация локальных значений

                setDisappearingTaskID(null); // сбрасываем ID удаленной задачи
            }, 400);
        });
    }, []);

    const toggleTaskComplete = useCallback((taskId, isDone) => {
        tasksAPI.toggleComplete(taskId, isDone).then(() => {
            dispatch({ type: "TOGGLE_COMPLETE", id: taskId, isDone });
        });
    }, []);

    const addTask = useCallback((title) => {
        const newTask = {
            title,
            isDone: false,
        };

        tasksAPI.add(newTask).then((addedTask) => {
            dispatch({ type: "ADD", task: addedTask });

            setNewTaskTitle(""); // как form.reset()

            setSearchQuery(""); // чтобы после переключения с поиска на добавление новой задачи поисковая строка была пустой

            newTaskInputRef.current.focus();

            setAppearingTaskID(addedTask.id);

            setTimeout(() => {
                setAppearingTaskID(null);
            }, 400);
        });
    }, []);

    useEffect(() => {
        newTaskInputRef.current.focus();

        tasksAPI
            .getAll()
            .then((serverTasks) =>
                dispatch({ type: "SET_ALL", task: serverTasks }),
            );
    }, []);

    const filteredTasks = useMemo(() => {
        const clearSearchQuery = searchQuery.trim().toLowerCase();

        return clearSearchQuery.length > 0
            ? tasks.filter(({ title }) =>
                  title.toLowerCase().includes(clearSearchQuery),
              )
            : null;
    }, [searchQuery, tasks]);

    return {
        tasks,
        filteredTasks,
        deleteAllTasks,
        deleteTask,
        toggleTaskComplete,

        newTaskTitle,
        setNewTaskTitle,
        searchQuery,
        setSearchQuery,
        newTaskInputRef,
        addTask,

        disappearingTaskID,
        appearingTaskID,
    };
}

export default useTasks;
