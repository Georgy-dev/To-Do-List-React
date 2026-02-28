import { createContext, useMemo } from "react";

import useTasks from "./useTasks";
import useIncompleteTaskScroll from "./useIncompleteTaskScroll";

export const TasksContext = createContext({});

export function TasksProvider({ children }) {
    const {
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
    } = useTasks();

    const { firstIncompleteTaskRef, firstIncompleteTaskID } =
        useIncompleteTaskScroll(tasks);

    const value = useMemo(
        () => ({
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
            firstIncompleteTaskRef,
            firstIncompleteTaskID,
        }),
        [
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
            firstIncompleteTaskRef,
            firstIncompleteTaskID,
        ],
    );

    return (
        <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
    );
}
