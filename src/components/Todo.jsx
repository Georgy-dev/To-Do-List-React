import { useState, useEffect } from "react";
import AddTaskForm from "./AddTaskForm";
import SearchTaskForm from "./SearchTaskForm";
import TodoInfo from "./TodoInfo";
import TodoList from "./TodoList";

function Todo() {
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

    const deleteAllTasks = () => {
        const isConfirmed = confirm(
            "Вы уверены, что хотите удалить все задачи?",
        );

        if (isConfirmed) {
            setTasks([]);
        }
    };

    const deleteTask = (taskId) => {
        setTasks(tasks.filter((task) => task.id !== taskId));
    };

    const toggleTaskComplete = (taskId, isDone) => {
        setTasks(
            tasks.map((task) => {
                if (task.id === taskId) {
                    return { ...task, isDone };
                }

                return task;
            }),
        );
    };

    const addTask = () => {
        if (newTaskTitle.trim().length > 0) {
            const newTask = {
                id: crypto?.randomUUID() ?? Date.now().toString(),
                title: newTaskTitle,
                isDone: false,
            };

            setTasks([...tasks, newTask]);

            setNewTaskTitle(""); // как form.reset()

            setSearchQuery(""); // чтобы после переключения с поиска на добавление новой задачи поисковая строка была пустой
        }
    };

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    const clearSearchQuery = searchQuery.trim().toLowerCase();
    const filteredTasks =
        clearSearchQuery.length > 0
            ? tasks.filter(({ title }) =>
                  title.toLowerCase().includes(clearSearchQuery),
              )
            : null;

    return (
        <div className="todo">
            <h1 className="todo__title">To Do List</h1>
            <AddTaskForm
                addTask={addTask}
                newTaskTitle={newTaskTitle}
                setNewTaskTitle={setNewTaskTitle}
            />
            <SearchTaskForm
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
            />
            <TodoInfo
                total={tasks.length}
                done={tasks.filter(({ isDone }) => isDone).length}
                onDeleteAllButtonClick={deleteAllTasks}
            />
            <TodoList
                tasks={tasks}
                onDeleteTaskButtonClick={deleteTask}
                onTaskCompleteChange={toggleTaskComplete}
                filteredTasks={filteredTasks}
            />
        </div>
    );
}

export default Todo;
