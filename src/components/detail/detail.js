import styles from "./detail.module.css";
import PropTypes from 'prop-types';

export const WeatherDetail = ({ children }) => {
  return <div className={styles.wrapper}>{children}</div>;
};

WeatherDetail.propTypes = {
  children : PropTypes.node
};