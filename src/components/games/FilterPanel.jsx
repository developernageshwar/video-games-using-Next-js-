import { FaArrowUp, FaArrowDown, FaTimes } from "react-icons/fa";
import styles from "./FilterPanel.module.css";

import Input from "../common/Input";
import Select from "../common/Select";
import Button from "../common/Button";

import { SORT_OPTIONS } from "../../utils/constants";

const FilterPanel = ({
  filters,
  onFilterChange,
  onClear,
  onSortDirectionChange,
  onClose,
}) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onFilterChange(name, value);
  };

  const sortOptions = SORT_OPTIONS;

  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <h3>Filter Results</h3>
        {onClose && (
          <button className={styles.closeBtn} onClick={onClose}>
            <FaTimes />
          </button>
        )}
      </div>

      <div className={styles.group}>
        <Input
          label="Name (contains)"
          id="name"
          name="name"
          placeholder="Text string"
          value={filters.name}
          onChange={handleChange}
        />
      </div>

      <div className={styles.row}>
        <div className={styles.group}>
          <Input
            label="Minimum Score"
            type="number"
            id="minScore"
            name="minScore"
            placeholder="1 - 10"
            min="1"
            max="10"
            value={filters.minScore}
            onChange={handleChange}
          />
        </div>

        <div className={styles.group}>
          <label className={styles.label}>Order By</label>
          <div className={styles.sortControl}>
            <Button
              variant="icon"
              onClick={onSortDirectionChange}
              aria-label="Toggle sort direction"
              className={styles.sortBtn}
            >
              {filters.sortDirection === "asc" ? (
                <FaArrowUp />
              ) : (
                <FaArrowDown />
              )}
            </Button>
            <Select
              id="orderBy"
              name="orderBy"
              value={filters.orderBy}
              onChange={handleChange}
              options={sortOptions}
              className={styles.sortSelect}
            />
          </div>
        </div>

        <div className={styles.clearContainer}>
          <Button
            onClick={onClear}
            className={styles.clearBtn}
            variant="primary"
          >
            Clear
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
