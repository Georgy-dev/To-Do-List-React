const STORAGE_KEY = "tasks";

const read = () => {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    } catch (error) {
        return [];
    }
};

const write = (tasks) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
};

// Иммитация задержки
const delay = (ms = 200) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

const localAPI = {
    getAll: async () => {
        await delay();

        return read();
    },

    getByID: async (id) => {
        await delay();

        return read().find((task) => task === id) ?? null;
    },

    add: async (task) => {
        await delay();

        const newTask = {
            ...task,
            id: crypto?.randomUUID() ?? Date().now().toString(),
        };

        const currentTasks = read();

        write([...currentTasks, newTask]);

        return newTask;
    },

    delete: async (id) => {
        await delay();

        const tasks = read().filter((task) => task.id !== id);

        write(tasks);
    },

    deleteAll: async () => {
        await delay();

        write([]);
    },

    toggleComplete: async (id, isDone) => {
        await delay();

        const tasks = read().map((task) => {
            return task.id === id ? { ...task, isDone } : task;
        });

        write(tasks);
    },
};

export default localAPI;
