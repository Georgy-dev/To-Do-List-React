// В dev режиме работает json-server
// А в build режиме будет работать через local storage

import localAPI from "./local";
import serverAPI from "./server";

const isLocal = import.meta.env.VITE_STATIC_BACKEND === "true";

const tasksAPI = isLocal ? localAPI : serverAPI;

export default tasksAPI;
