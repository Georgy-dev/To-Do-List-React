// Этот компонент иммитирует обычную ссылку, но работает по правилам react

import { BASE_URL } from "@/shared/constants";

function RouterLink({ to, children, ...rest }) {
    const handleClick = (event) => {
        event.preventDefault();

        window.history.pushState({}, "", to); // меняем url без перезагрузки

        window.dispatchEvent(new PopStateEvent("popstate"));
        // вручную генерируем события popstate, чтобы роутер узнал, что путь изменился и обновил свое состояние
    };

    return (
        <a href={`${BASE_URL}${to}`} onClick={handleClick} {...rest}>
            {children}
        </a>
    );
}

export default RouterLink;
