import styles from "./Select.module.css";

const Select = ({
  label,
  id,
  name,
  value,
  onChange,
  options = [],
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
      <select
        id={id || name}
        name={name}
        className={styles.select}
        value={value}
        onChange={onChange}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
