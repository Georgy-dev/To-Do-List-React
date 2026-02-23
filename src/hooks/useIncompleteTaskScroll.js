import { useRef } from "react";

function useIncompleteTaskScroll(tasks) {
    const firstIncompleteTaskRef = useRef(null);
    const firstIncompleteTaskID = tasks.find((item) => !item.isDone)?.id; // ?. для безопасности, вдруг у нас такого элемента нет

    return { firstIncompleteTaskRef, firstIncompleteTaskID };
}

export default useIncompleteTaskScroll;
