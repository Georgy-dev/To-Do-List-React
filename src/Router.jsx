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

    const Page = routes[path] ?? routes["*"]; // в routes['*'] находится ссылка на компонент страницы 404

    return <Page />;
}

export default Router;
