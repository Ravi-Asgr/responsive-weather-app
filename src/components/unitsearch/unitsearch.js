import styles from "./unitsearch.module.css";
import PropTypes from 'prop-types';

export const UnitSearch = ({ unitSystem }) => {
  return (
    <div className={styles.wrapper}>
      <p
        className={`${styles.switch} ${
          unitSystem == "metric" ? styles.active : styles.inactive
        }`}
       
      >
        Metric System
      </p>
      <p
        className={`${styles.switch} ${
          unitSystem == "metric" ? styles.inactive : styles.active
        }`}
        
      >
        Imperial System
      </p>
    </div>
  );
};

UnitSearch.propTypes = {
  unitSystem : PropTypes.string
}