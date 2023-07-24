import styles from "./weatherparameter.module.css";
import PropTypes from 'prop-types';

export const WeatherParam = ({ title, iconSrc, metric, unit }) => {
  return (
    <div className={styles.wrapper}>
      <p>{title}</p>
      <div className={styles.content}>
        <div >
          <img width="100px" height="100px" src={iconSrc} alt="weatherIcon" />
        </div>
        <div>
          <h1>{metric}</h1>
          <p>{unit}</p>
        </div>
      </div>
    </div>
  );
}

WeatherParam.propTypes = {
  title : PropTypes.string,
  iconSrc : PropTypes.string,
  metric : PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  unit : PropTypes.string
}