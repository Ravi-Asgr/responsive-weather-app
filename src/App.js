import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import './App.css';
import { ToggleBox } from './components/togglebox/togglebox';
import { WeatherSummary } from './components/summary/summary';
import { WeatherParameters } from './components/parameters/parameters';
import { WeatherDetail } from './components/detail/detail';
import { Filter } from './components/filter/filter';
import { FutureDays, FormattedForecastHourWise, WeatherApi, ApiError } from './util';

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
  /* Select tag (date and hour) disabled/enabled state*/
  const [selectDisabled, setSelectDisabled] = useState(true);

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
        setweatherData({ ...weatherData });
      } else {
        const formattedForecast = await FormattedForecastHourWise(weatherData);
        setForecastWeatherData(formattedForecast);
        setweatherData({ ...formattedForecast[forecastDayIndex][forecastDayHour] });
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
      setSelectDisabled(true);
      setForecastDayIndex(0);
      doRefresh(!isRefresh);
    } else {
      setForecastDay(dayArray[forecastDayIndex]);
      setSelectDisabled(false);
      doRefresh(!isRefresh);
    }

    console.log('dates ' + dayArray);
    console.log(e.target.name)
  }

  const toggleForecastDay = (e) => {
    let dataIndex = e.target.childNodes[e.target.selectedIndex].getAttribute('data-index');
    //console.log('aa ' + e.target.childNodes[e.target.selectedIndex].getAttribute('data-index'))
    setForecastDay(e.target.value);
    setForecastDayIndex(dataIndex);
    setweatherData({ ...forecastWeatherData[dataIndex][forecastDayHour] });
  }

  const toggleForecastDayHour = (e) => {
    setForecastDayHour(e.target.value);
    setweatherData({ ...forecastWeatherData[forecastDayIndex][e.target.value] });
  }

  return (
    <>
      <ToggleBox unitSystem={unit} changeUnitFunction={toggleUnit} weatherType={weatherType}
        changeWeatherFunction={toggleWeatherType} displayDates={dayArray} choosenDay={forecastDay}
        toggleDay={toggleForecastDay} forecastDayHour={forecastDayHour} toggleHour={toggleForecastDayHour}
        toggleSelectDisabled={selectDisabled} />

      <main className='font-mono w-full text-xs sm:text-base sm:font-medium bg-gray-100 sm:rounded-3xl shadow-2xl overflow-hidden'>
        <div className='grid grid-cols-1 justify-items-center gap-5 lg:grid-cols-[1.25fr_1.75fr]'>
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
      </main>
    </>
  );
}

export default App;
