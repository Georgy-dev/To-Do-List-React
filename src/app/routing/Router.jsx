// Это верхнеуровневая обертка приложения

import { useEffect, useState } from "react";
import { BASE_URL } from "@/shared/constants";

const getCurrentPath = () => {
    const pathname = window.location.pathname;

    return pathname.startsWith(BASE_URL)
        ? pathname.slice(BASE_URL.length - 1) || "/"
        : pathname;
};

const matchPath = (path, route) => {
    const pathParts = path.split("/"); // ['', 'tasks', '123']
    const routeParts = route.split("/"); // ['', 'tasks', ':id']

    if (pathParts.length !== routeParts.length) {
        return null;
    }

    const params = {};

    for (let i = 0; i < routeParts.length; i++) {
        if (routeParts[i].startsWith(":")) {
            const paramName = routeParts[i].slice(1);

            params[paramName] = pathParts[i];
        } else if (routeParts[i] !== pathParts[i]) {
            return null;
        }
    }

    return params; // если путь подошел под шаблон
};

export const useRoute = () => {
    const [path, setPath] = useState(getCurrentPath());

    useEffect(() => {
        const onLocationChange = () => {
            setPath(getCurrentPath());
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

    for (const route in routes) {
        const params = matchPath(path, route);

        if (params) {
            const Page = routes[route];

            return <Page params={params} />;
        }
    }

    const NotFound = routes["*"];

    return <NotFound />;
}

export default Router;
