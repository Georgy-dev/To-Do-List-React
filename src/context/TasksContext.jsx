import { createContext } from "react";

import useTasks from "../hooks/useTasks";
import useIncompleteTaskScroll from "../hooks/useIncompleteTaskScroll";

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

                disappearingTaskID,
                appearingTaskID,
            }}
        >
            {children}
        </TasksContext.Provider>
    );
}
