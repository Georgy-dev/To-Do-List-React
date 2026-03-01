import styles from "./Button.module.scss";

function Button({
    className = "",
    type = "button",
    children,
    onClick,
    isDisabled,
}) {
    return (
        <button
            className={`${styles.button} ${className}`}
            onClick={onClick}
            type={type}
            disabled={isDisabled}
        >
            {children}
        </button>
    );
}

export default Button;
