import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import useTasksLocalStorage from "./useTasksLocalStorage";

function useTasks() {
    const { saveTasks, savedTasks } = useTasksLocalStorage();

    const [tasks, setTasks] = useState(
        savedTasks ?? [
            { id: "task1", title: "Learn React", isDone: false },
            { id: "task2", title: "Learn JS", isDone: true },
        ],
    );

    const [newTaskTitle, setNewTaskTitle] = useState("");

    const [searchQuery, setSearchQuery] = useState("");

    const newTaskInputRef = useRef(null);

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

    const addTask = useCallback((title) => {
        const newTask = {
            id: crypto?.randomUUID() ?? Date.now().toString(),
            title,
            isDone: false,
        };

        setTasks((prevTasks) => [...prevTasks, newTask]);

        setNewTaskTitle(""); // как form.reset()

        setSearchQuery(""); // чтобы после переключения с поиска на добавление новой задачи поисковая строка была пустой

        newTaskInputRef.current.focus();
    }, []);

    useEffect(() => {
        saveTasks(tasks);
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
