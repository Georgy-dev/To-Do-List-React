import { useState, useEffect, useRef, useCallback, useMemo } from "react";

import AddTaskForm from "./AddTaskForm";
import SearchTaskForm from "./SearchTaskForm";
import TodoInfo from "./TodoInfo";
import TodoList from "./TodoList";
import Button from "./Button";

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

    const doneTasks = useMemo(() => {
        tasks.filter(({ isDone }) => isDone).length;
    }, [tasks]);

    return (
        <div className="todo">
            <h1 className="todo__title">To Do List</h1>
            <AddTaskForm
                addTask={addTask}
                newTaskTitle={newTaskTitle}
                setNewTaskTitle={setNewTaskTitle}
                newTaskInputRef={newTaskInputRef}
            />
            <SearchTaskForm
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
            />
            <TodoInfo
                total={tasks.length}
                done={doneTasks}
                onDeleteAllButtonClick={deleteAllTasks}
            />
            <Button
                onClick={() =>
                    firstIncompleteTaskRef.current?.scrollIntoView({
                        behaviour: "smooth",
                    })
                }
            >
                Show first incomplete task
            </Button>
            <TodoList
                tasks={tasks}
                onDeleteTaskButtonClick={deleteTask}
                onTaskCompleteChange={toggleTaskComplete}
                filteredTasks={filteredTasks}
                firstIncompleteTaskRef={firstIncompleteTaskRef}
                firstIncompleteTaskID={firstIncompleteTaskID}
            />
        </div>
    );
}

export default Todo;
