import Field from "./Field";

function SearchTaskForm({ onSearchInput }) {
    return (
        <form
            className="todo__form"
            onSubmit={(event) => event.preventDefault()}
        >
            <Field
                className="todo__field"
                label="Search task"
                id="search-task"
                type="search"
                onInput={(event) => onSearchInput(event.target.value)}
            />
        </form>
    );
}

export default SearchTaskForm;
