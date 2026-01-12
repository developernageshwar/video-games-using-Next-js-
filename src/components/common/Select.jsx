import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
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
  const [isOpen, setIsOpen] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0, width: 0 });
  const containerRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target) &&
        !event.target.closest(`.${styles.dropdown}`)
      ) {
        setIsOpen(false);
      }
    };

    const handleResizeOrScroll = () => {
      if (isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("resize", handleResizeOrScroll);
    window.addEventListener("scroll", handleResizeOrScroll, true);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("resize", handleResizeOrScroll);
      window.removeEventListener("scroll", handleResizeOrScroll, true);
    };
  }, [isOpen]);

  const handleToggle = () => {
    if (!triggerRef.current) return;

    if (!isOpen) {
      const rect = triggerRef.current.getBoundingClientRect();
      setCoords({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }

    setIsOpen(!isOpen);
  };

  const handleOptionClick = (optionValue) => {
    const event = {
      target: {
        name: name,
        value: optionValue,
      },
    };
    onChange(event);
    setIsOpen(false);
  };

  const selectedOption = options.find((opt) => opt.value === value);
  const displayValue = selectedOption ? selectedOption.label : value;

  return (
    <div
      className={`${styles.group} ${className}`}
      ref={containerRef}
      {...props}
    >
      {label && (
        <label htmlFor={id || name} className={styles.label}>
          {label}
        </label>
      )}
      <div
        className={styles.selectWrapper}
        onClick={handleToggle}
        ref={triggerRef}
      >
        <div
          className={`${styles.trigger} ${isOpen ? styles.open : ""}`}
          data-part="trigger"
        >
          <span className={styles.value}>{displayValue}</span>
          {isOpen ? (
            <FaCaretUp className={styles.icon} />
          ) : (
            <FaCaretDown className={styles.icon} />
          )}
        </div>

        {isOpen &&
          typeof document !== "undefined" &&
          createPortal(
            <div
              className={styles.dropdown}
              style={{
                top: coords.top,
                left: coords.left,
                width: coords.width,
              }}
            >
              {options.map((option) => (
                <div
                  key={option.value}
                  className={`${styles.option} ${option.value === value ? styles.selected : ""
                    }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOptionClick(option.value);
                  }}
                >
                  {option.label}
                </div>
              ))}
            </div>,
            document.body
          )}
      </div>
      <input type="hidden" name={name} value={value} />
    </div>
  );
};

export default Select;
