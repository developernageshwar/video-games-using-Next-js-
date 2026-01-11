import styles from "./TextArea.module.css";

const TextArea = ({
  label,
  id,
  name,
  placeholder,
  value,
  onChange,
  rows = 4,
  className = "",
  ...props
}) => {
  return (
    <div className={`${styles.group} ${className}`}>
      {label && (
        <label htmlFor={id || name} className={styles.label}>
          {label}
        </label>
      )}
      <textarea
        id={id || name}
        name={name}
        className={styles.textarea}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        rows={rows}
        {...props}
      />
    </div>
  );
};

export default TextArea;
