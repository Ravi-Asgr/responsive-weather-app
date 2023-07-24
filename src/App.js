import { useState, useEffect } from 'react';
import styles from './css/home.module.css'
import { WeatherSummary } from './components/summary/summary';
import { WeatherDetail } from './components/detail/detail';
import { Filter } from './components/filter/filter';
import { WeatherParameters } from './components/parameters/parameters';
import { ToggleBox } from './components/togglebox/togglebox';
import { FutureDays, FormattedForecastHourWise, WeatherApi, ApiError } from './util';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  /* Set state of Unit radio */
  const [unit, setUnit] = useState('metric');
  /* Set state of weather type */
  const [weatherType, setweatherType] = useState('today');
  /* Set state of forecast date */
  const [forecastDay, setForecastDay] = useState('');
  /* Set state of forecast date index */
  const [forecastDayIndex, setForecastDayIndex] = useState(0);
  /* Set state of forecast date hour */
  const [forecastDayHour, setForecastDayHour] = useState('0');
  /* Set state of forecast weather */
  //const [isForecast, setIsForecast] = useState(false);
  /* Set state for weather response*/
  const [weatherData, setweatherData] = useState();
  /* Set state for forecast weather response*/
  const [forecastWeatherData, setForecastWeatherData] = useState();
  /* Set state to call weather api */
  const [isRefresh, doRefresh] = useState(true);
  /* Set state for searched city */
  const [city, setCity] = useState('Bangalore');

  /* Get next 3 days in array */
  const dayArray = FutureDays(3);

  useEffect(() => {
    const apiCall = async () => {
      console.log(`${weatherType} API call ...... refresh is ${isRefresh}`);
      const resp = await fetch(WeatherApi(weatherType, city));
      const weatherData = await resp.json();
      if (weatherData.cod === '404') {
        ApiError(toast, weatherData.message);
        return;
      }
      else if (weatherType === 'today') {
        setweatherData({...weatherData});
      } else {
        const formattedForecast = await FormattedForecastHourWise(weatherData);
        setForecastWeatherData(formattedForecast);
        setweatherData({...formattedForecast[forecastDayIndex][forecastDayHour]});
      }
    }
    apiCall();
  }, [isRefresh])

  const toggleUnit = (e) => {
    setUnit(e.target.value);
  }

  const toggleWeatherType = async (e) => {
    setweatherType(e.target.name);
    if (e.target.name === 'today') {
      setForecastDay('');
      setForecastDayIndex(0);
      doRefresh(!isRefresh);
    } else {
      setForecastDay(dayArray[forecastDayIndex]);
      doRefresh(!isRefresh);
    }
      
    console.log('dates ' + dayArray);
    console.log(e.target.name)
  }

  const toggleForecastDay = (e) => {
    //console.log('aa ' + e.currentTarget.dataset.index)
    setForecastDay(e.target.text);
    setForecastDayIndex(e.currentTarget.dataset.index);
    setweatherData({...forecastWeatherData[e.currentTarget.dataset.index][forecastDayHour]});
  }

  const toggleForecastDayHour = (e) => {
    setForecastDayHour(e.target.value);
    setweatherData({...forecastWeatherData[forecastDayIndex][e.target.value]});
  }

  return (
    <>
    <div className={styles.wrapper}>
      <ToggleBox unitSystem={unit} changeUnitFunction={toggleUnit} weatherType={weatherType} 
        changeWeatherFunction={toggleWeatherType} displayDates={dayArray} choosenDay={forecastDay}
        toggleDay={toggleForecastDay} forecastDayHour={forecastDayHour} toggleHour={toggleForecastDayHour} />  
    </div>

    <div className={styles.wrapper}>
      <WeatherSummary weatherData={weatherData} unit={unit} />
      <WeatherDetail>
        <Filter 
          weatherData={weatherData}
          placeHolder="Search a city..." 
            onFocus={(e) => {
              console.log('focus ' + e.target)
              e.target.value = "";
              e.target.placeholder = "";
            }}
            onChange={(e) => {
              setCity(e.target.value)
            }}
            onKeyDown={(e) => {
              e.keyCode === 13 && doRefresh(!isRefresh);
              e.target.placeholder = "Search a city...";
            }} 
          value={city}
        />
        <WeatherParameters weatherData={weatherData} unit={unit} />
      </WeatherDetail>
    </div>
    </>
  );
}

export default App;
