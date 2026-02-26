import { useContext } from "react";

import { TasksContext } from "../../context/TasksContext";
import AddTaskForm from "../AddTaskForm/AddTaskForm";
import SearchTaskForm from "../SearchTaskForm/SearchTaskForm";
import TodoInfo from "../TodoInfo/TodoInfo";
import TodoList from "../TodoList/TodoList";
import Button from "../Button/Button";

import styles from "./Todo.module.scss";

function Todo() {
    const { firstIncompleteTaskRef } = useContext(TasksContext);

    return (
        <div className={styles.todo}>
            <h1 className={styles.title}>To Do List</h1>
            <AddTaskForm styles={styles} />
            <SearchTaskForm styles={styles} />
            <TodoInfo styles={styles} />
            <Button
                onClick={() =>
                    firstIncompleteTaskRef.current?.scrollIntoView({
                        behaviour: "smooth",
                    })
                }
            >
                Show first incomplete task
            </Button>
            <TodoList styles={styles} />
        </div>
    );
}

export default Todo;
