import styles from "./Button.module.css";

const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary", // primary, secondary, icon
  disabled = false,
  className = "",
  ...props
}) => {
  return (
    <button
      type={type}
      className={`${styles.button} ${styles[variant]} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
