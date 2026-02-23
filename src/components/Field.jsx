function Field({
    className = "",
    id,
    label,
    type = "text",
    onInput,
    value,
    ref,
    error,
}) {
    return (
        <div className={`field ${className}`}>
            <label className="field__label" htmlFor={id}>
                {label}
            </label>
            <input
                className={`field__input ${error ? "is-invalid" : ""}`}
                id="new-task"
                placeholder=" "
                autoComplete="off"
                type={type}
                onInput={onInput}
                value={value}
                ref={ref}
            />
            {error && (
                <span className="field__error" title={error}>
                    {/** title={error} - для того, чтобы при большом тексте пользователь смог прочитать коммент полностью при наведении на текст ошибки, подробнее см. field.css */}
                    {error}
                </span>
            )}
        </div>
    );
}

export default Field;
