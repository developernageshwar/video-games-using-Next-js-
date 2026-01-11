import styles from "./Input.module.css";

const Input = ({
  label,
  id,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  className = "",
  min,
  max,
  ...props
}) => {
  return (
    <div className={`${styles.group} ${className}`}>
      {label && (
        <label htmlFor={id || name} className={styles.label}>
          {label}
        </label>
      )}
      <input
        type={type}
        id={id || name}
        name={name}
        className={styles.input}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        {...props}
      />
    </div>
  );
};

export default Input;
