import { useContext } from "react";

import { TasksContext } from "../context/TasksContext";

import AddTaskForm from "./AddTaskForm";
import SearchTaskForm from "./SearchTaskForm";
import TodoInfo from "./TodoInfo";
import TodoList from "./TodoList";
import Button from "./Button";

function Todo() {
    const { firstIncompleteTaskRef } = useContext(TasksContext);

    return (
        <div className="todo">
            <h1 className="todo__title">To Do List</h1>
            <AddTaskForm />
            <SearchTaskForm />
            <TodoInfo />
            <Button
                onClick={() =>
                    firstIncompleteTaskRef.current?.scrollIntoView({
                        behaviour: "smooth",
                    })
                }
            >
                Show first incomplete task
            </Button>
            <TodoList />
        </div>
    );
}

export default Todo;
