// Это верхнеуровневая обертка приложения

import { useEffect, useState } from "react";

export const useRoute = () => {
    const [path, setPath] = useState(window.location.pathname);

    useEffect(() => {
        const onLocationChange = () => {
            setPath(window.location.pathname);
        };

        window.addEventListener("popstate", onLocationChange); // монтирование компонента DOM

        return () => {
            window.removeEventListener("popstate", onLocationChange); // размонтирование компонента DOM
        };
    }, []);

    return path;
};

function Router({ routes }) {
    const path = useRoute(); // получаем актуальный путь

    if (path.startsWith("/tasks/")) {
        const id = path.replace("/tasks/", "");

        const TaskPage = routes["/tasks/:id"]; // :id - шаблон маршрутизации

        return <TaskPage params={{ id }} />;
    }

    const Page = routes[path] ?? routes["*"]; // в routes['*'] находится ссылка на компонент страницы 404

    return <Page />;
}

export default Router;
