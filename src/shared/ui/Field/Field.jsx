import styles from "./Field.module.scss";

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
        <div className={`${styles.field} ${className}`}>
            <label className={`${styles.label}`} htmlFor={id}>
                {label}
            </label>
            <input
                className={`${styles.input} ${error ? styles.isInvalid : ""}`}
                id={id}
                placeholder=" "
                autoComplete="off"
                type={type}
                onInput={onInput}
                value={value}
                ref={ref}
            />
            {error && (
                <span className={`${styles.error}`} title={error}>
                    {/** title={error} - для того, чтобы при большом тексте пользователь смог прочитать коммент полностью при наведении на текст ошибки, подробнее см. field.css */}
                    {error}
                </span>
            )}
        </div>
    );
}

export default Field;
