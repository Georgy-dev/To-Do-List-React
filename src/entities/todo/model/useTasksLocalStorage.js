function useTasksLocalStorage() {
    const savedTasks = localStorage.getItem("tasks");

    const saveTasks = (tasks) => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    };

    return {
        saveTasks,
        savedTasks: savedTasks
            ? JSON.parse(localStorage.getItem("tasks"))
            : null,
    };
}

export default useTasksLocalStorage;
