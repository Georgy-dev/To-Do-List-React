import Field from "./Field";

function SearchTaskForm() {
    return (
        <form className="todo__form">
            <Field
                className="todo__field"
                label="Search task"
                id="search-task"
                type="search"
            />
        </form>
    );
}

export default SearchTaskForm;
