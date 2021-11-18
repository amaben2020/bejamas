import { useState } from 'react';
import { handleToggle } from './../utills';
import styles from './../../../styles/checkbox.module.scss';

const Checkboxes = ({ list, handleFilters }) => {
  const [checkedArray, setCheckedArray] = useState([]);

  const onChangeHandler = (checkboxId) => {
    //simply selects the checkboxId that matches the id in the array
    const newState = handleToggle(checkboxId, checkedArray);

    //passing the value to the checkedArray state
    setCheckedArray(newState);
    // Update this checked information into Parent Component
    handleFilters(newState.map((id) => list[id].value));
  };

  return list.map((item, index) => {
    return (
      <div key={index} className={styles.myCheckbox}>
        <input
          className={styles.myCheckbox__input}
          type="checkbox"
          id={item.name}
          checked={checkedArray.indexOf(item.id) !== -1}
          onChange={() => onChangeHandler(item.id)}
        />
        <label className={styles.myCheckbox__label} htmlFor={item.name}>
          {item.label}{' '}
        </label>
      </div>
    );
  });
};

export default Checkboxes;
