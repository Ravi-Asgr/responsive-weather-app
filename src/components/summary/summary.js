import styles from "./summary.module.css";
import PropTypes from 'prop-types';
import { TempWitUnit } from "../../util";

export const WeatherSummary = ({ weatherData, unit }) => {
    return (
        <>
        { weatherData && Object.keys(weatherData).length != 0 && (
            <div className={styles.wrapper}>
                <h1 className={styles.location}>
                    {weatherData.name}, {weatherData.sys.country}
                </h1>
                <p className={styles.description}>{weatherData.weather[0].description}</p>
                <img width="300px" height="300px" src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                    alt="weatherIcon"/>
                <h1 className={styles.temperature}>{TempWitUnit(weatherData.main.temp, unit)}</h1>
                <p>Feels like {TempWitUnit(weatherData.main.feels_like, unit)}</p>    
            </div>
        )}
        </>
    );
}

WeatherSummary.propTypes = {
    weatherData : PropTypes.object,
    unit : PropTypes.string
}