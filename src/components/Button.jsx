function Button({ className = "", type = "button", children, onClick }) {
    return (
        <button className={`button ${className}`} onClick={onClick} type={type}>
            {children}
        </button>
    );
}

export default Button;
