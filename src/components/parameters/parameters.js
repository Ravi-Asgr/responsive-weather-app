import { WeatherParam } from "../weatherparameter/weatherparameter";
import { WindCardinal, Visibility, TimeFromTs, WindSpeed, TimePeriod } from "../../util";
import PropTypes from 'prop-types';

export const WeatherParameters = ({ weatherData, unit }) => {
  return (
    <div className='grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4 sm:mr-4'>
      { weatherData && Object.keys(weatherData).length != 0 && (
      <>  
      <WeatherParam
        title={"Humidity"}
        iconSrc={"/icons/humidity.png"}
        metric={weatherData.main.humidity}
        unit={"%"}
      />
      <WeatherParam
        title={"Wind speed"}
        iconSrc={"/icons/wind.png"}
        metric={WindSpeed(weatherData.wind.speed, unit)}
        unit={unit==='metric'?'m/s':'mi/h'}
      />
      <WeatherParam
        title={"Wind direction"}
        iconSrc={"/icons/compass.png"}
        metric={WindCardinal(weatherData.wind.deg)}
      />
      <WeatherParam
        title={"Visibility"}
        iconSrc={"/icons/view.png"}
        metric={Visibility(weatherData.visibility, unit)}
        unit={unit==='metric'?'km':'mi'}
      />
      <WeatherParam
        title={"Sunrise"}
        iconSrc={"/icons/sunrise.png"}
        metric={TimeFromTs(weatherData.sys.sunrise, weatherData.timezone)}
        unit={TimePeriod(weatherData.sys.sunrise)}
      />
      <WeatherParam
        title={"Sunset"}
        iconSrc={"/icons/sunset.png"}
        metric={TimeFromTs(weatherData.sys.sunset, weatherData.timezone)}
        unit={TimePeriod(weatherData.sys.sunset)}
      /></>
      )}
    </div>
  );
};

WeatherParameters.propTypes = {
  weatherData : PropTypes.object,
  unit : PropTypes.string
}
