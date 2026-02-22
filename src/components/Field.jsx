function Field({
    className = "",
    id,
    label,
    type = "text",
    onInput,
    value,
    ref,
}) {
    return (
        <div className={`field ${className}`}>
            <label className="field__label" htmlFor={id}>
                {label}
            </label>
            <input
                className="field__input"
                id="new-task"
                placeholder=" "
                autoComplete="off"
                type={type}
                onInput={onInput}
                value={value}
                ref={ref}
            />
        </div>
    );
}

export default Field;
