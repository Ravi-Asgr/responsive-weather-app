import PropTypes from 'prop-types';
import { TempWitUnit } from "../../util";

export const WeatherSummary = ({ weatherData, unit }) => {
    return (
        <>
            {weatherData && Object.keys(weatherData).length != 0 && (
                <div className='grid grid-cols-1 justify-items-center w-full bg-white'>
                    <h1 className='text-xl mt-3 sm:text-3xl font-bold'>
                        {weatherData.name}, {weatherData.sys.country}
                    </h1>
                    <p className='text-lg sm:text-2xl'>
                        {weatherData.weather[0].description}
                    </p>
                    <div>
                        <img className='object-fill flex justify-center w-28 h-28 sm:w-52 sm:h-52 overflow-hidden'
                            src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                            alt='Weather' />
                    </div>
                    <h1 className='text-xl sm:text-3xl font-bold'>
                        {TempWitUnit(weatherData.main.temp, unit)}
                    </h1>
                    <p className='mb-2'>
                        Feels like {TempWitUnit(weatherData.main.feels_like, unit)}
                    </p>
                </div>
            )}
        </>
    );
}

WeatherSummary.propTypes = {
    weatherData: PropTypes.object,
    unit: PropTypes.string
}