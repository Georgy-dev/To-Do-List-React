import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import tasksAPI from "../api/tasksAPI";

function useTasks() {
    const [tasks, setTasks] = useState([]);

    const [newTaskTitle, setNewTaskTitle] = useState("");

    const [searchQuery, setSearchQuery] = useState("");

    const newTaskInputRef = useRef(null);

    const deleteAllTasks = useCallback(() => {
        const isConfirmed = confirm(
            "Вы уверены, что хотите удалить все задачи?",
        );

        if (isConfirmed) {
            tasksAPI.deleteAll(tasks).then(() => setTasks([]));
        }
    }, [tasks]);

    const deleteTask = useCallback(
        (taskId) => {
            tasksAPI
                .delete(taskId)
                .then(() =>
                    setTasks(tasks.filter((task) => task.id !== taskId)),
                ); // фильтрация локальных значений
        },
        [tasks],
    );

    const toggleTaskComplete = useCallback(
        (taskId, isDone) => {
            tasksAPI.toggleComplete(taskId, isDone).then(() => {
                setTasks(
                    tasks.map((task) => {
                        if (task.id === taskId) {
                            return { ...task, isDone };
                        }

                        return task;
                    }),
                );
            });
        },
        [tasks],
    );

    const addTask = useCallback((title) => {
        const newTask = {
            title,
            isDone: false,
        };

        tasksAPI.add(newTask).then((addedTsk) => {
            setTasks((prevTasks) => [...prevTasks, addedTsk]);

            setNewTaskTitle(""); // как form.reset()

            setSearchQuery(""); // чтобы после переключения с поиска на добавление новой задачи поисковая строка была пустой

            newTaskInputRef.current.focus();
        });
    }, []);

    useEffect(() => {
        newTaskInputRef.current.focus();

        tasksAPI.getAll().then(setTasks);
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
    };
}

export default useTasks;
