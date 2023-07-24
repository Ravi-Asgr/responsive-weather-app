export const FutureDays = (x) => {
    let date = new Date();
    
    let dateArray = [];
    for (var i = 1; i<=x; i++) {
        let loopDate = new Date(date);
        loopDate.setDate(date.getDate() + i);
        dateArray.push(loopDate.toLocaleString('en-us',{month:'short', day:'numeric'}));
    } 
    return dateArray;
}

export const DateFromTs = (ts, shift) => {
    let date = new Date((ts + shift) * 1000);
    return date.toLocaleDateString('en-us', {month:'short', day:'numeric', year:'2-digit'});
}

export const TimeFromTs = (ts, shift) => {
    let date = new Date((ts + shift) * 1000);
    console.log (date.toISOString().match(/\d\d:\d\d/));
    return date.toISOString().match(/\d\d:\d\d/)[0];
}

export const TimePeriod = (ts) => {
    let date = new Date(ts * 1000);
    let dateString = date.toLocaleString('UTC', {hour: "numeric", minute: "numeric", hour12: true});
    return dateString.includes('AM') ? 'AM' : 'PM';
}

export const TempWitUnit = (value, unit) => {
    if (unit === 'metric') {
        return value.toFixed(0)+'°C';
    } else {
        return ((value * 9/5) + 32).toFixed(0)+'°F';
    }
}

export const WindSpeed = (value, unit) => {
    console.log('ssss ' + value + ' ' + unit)
    if (unit === 'metric') {
        return value.toFixed(0);
    } else {
        return (value * 2.2369).toFixed(0);
    }
}

export const WindCardinal = (angle) => {
    let arr = [
        "N",    //0
        "NNE",  //0-22.5
        "NE",   //22.5-45
        "ENE",  //45-67.5 
        "E",    //67.5-90
        "ESE",  //90-112.5
        "SE",   //112.5-135
        "SSE",  //135-157.5
        "S",    //157.5-180
        "SSW",  //180-202.5
        "SW",   //202.5-225
        "WSW",  //225-247.5
        "W",    //247.5-270
        "WNW",  //270-292.5
        "NW",   //292.5-315
        "NNW",  //315-337.5
        "N"     //337.5-360
    ];
    let val = Math.round(angle/22.5);
    return arr[val];
}

export const Visibility = (value, unit) => {
    return unit === 'metric' ? (value/1000).toFixed(1) : (value/1609.344).toFixed(1);
}

export const WeatherApi = (type, city) => {
    let weatherType = 'weather';
    if (type !== 'today') {
        weatherType = 'forecast'
    }
    return `https://api.openweathermap.org/data/2.5/${weatherType}?q=${city}&appid=e557c5f711ee42279337c14a07678335&units=metric`;
}

/*
   [
     {data for 19June
        "00hr": {weatherData},
        "03hr": {weatherData},
        ......
     },
     {data for 20June
        "00hr": {weatherData},
        "03hr": {weatherData},
        ......
     }  
   ]
*/
export const FormattedForecastHourWise = async (forecastWeather) => {
    let dataArray = forecastWeather.list;
    let startDate = new Date();
    let utcStartDate = new Date(startDate.getUTCFullYear(), startDate.getUTCMonth(), startDate.getUTCDate());
    utcStartDate.setDate(utcStartDate.getDate() + 1);
    /* to track last day, to comapare with variable 'utcDay' and detect change in day(date) */
    let lastUtcDay = '';
    /* weather for an entire day, an array with objects representing hourly weather */
    let dayWeather = [];
    /* weather for an hour, an object added to array 'dayWeather', encompasses 'weatherData' */
    let hourlyWeather = {};

    dataArray.forEach(ele => {    
        let eleTs = new Date((ele.dt)*1000);
        console.log(">>> "+ eleTs.getUTCHours())
        let utcEleTs = new Date(eleTs.getUTCFullYear(), eleTs.getUTCMonth(), eleTs.getUTCDate(), eleTs.getUTCHours());
        if (utcEleTs >= utcStartDate) {
             /* weather oject */
            let weatherData = {};
            let sys = {};
            weatherData.sys = sys;
            /* key for hourly data within a day*/
            let utcDayHour = eleTs.getUTCHours().toString();
            /* to track a day, used as key */
            let utcDay = utcEleTs.getDate();
            if (lastUtcDay !== utcDay && Object.keys(hourlyWeather).length !== 0) {
                /* there is change in date(next day), so do below */
                /* 1. push the hourly weather to daily weather */
                dayWeather.push(hourlyWeather);
                /* 2. reset hourlyWeather */
                hourlyWeather = {};
            }

            /* weather object construction start */
            weatherData.main = ele.main;
            weatherData.weather = ele.weather;
            weatherData.visibility = ele.visibility;
            weatherData.wind = ele.wind;
            weatherData.dt = ele.dt;
            weatherData.stringdate = ele.dt_txt;
            weatherData.timezone = forecastWeather.city.timezone;
            weatherData.name = forecastWeather.city.name; 
            weatherData.sys.country = forecastWeather.city.country;
            weatherData.sys.sunrise = forecastWeather.city.sunrise;
            weatherData.sys.sunset = forecastWeather.city.sunset;
            /* weather object construction end */

            /* add weather to hourly weather object*/
            hourlyWeather[utcDayHour] = weatherData;
            
            lastUtcDay = utcDay;
            utcStartDate = utcEleTs;
        }
    });  
    return dayWeather;     
}

export const FormattedForecast = async (forecastWeather) => {
    let factoredResponse = [];
    let dataArray = forecastWeather.list;
    let startDate = new Date();
    let utcStartDate = new Date(startDate.getUTCFullYear(), startDate.getUTCMonth(), startDate.getUTCDate());
    dataArray.forEach(ele => {
        let dayWeather = {};
        let sys = {};
        dayWeather.sys = sys;
        let eleTs = new Date((ele.dt)*1000);
        let utcEleTs = new Date(eleTs.getUTCFullYear(), eleTs.getUTCMonth(), eleTs.getUTCDate());
        if (utcEleTs > utcStartDate) {
            dayWeather.main = ele.main;
            dayWeather.weather = ele.weather;
            dayWeather.visibility = ele.visibility;
            dayWeather.wind = ele.wind;
            dayWeather.dt = ele.dt;
            dayWeather.stringdate = ele.dt_txt;
            dayWeather.timezone = forecastWeather.city.timezone;
            dayWeather.name = forecastWeather.city.name; 
            dayWeather.sys.country = forecastWeather.city.country;
            dayWeather.sys.sunrise = forecastWeather.city.sunrise;
            dayWeather.sys.sunset = forecastWeather.city.sunset;
            factoredResponse.push(dayWeather);
            utcStartDate = utcEleTs;
        }
    });  
    return factoredResponse;     
}

export const ApiError = (toast, message) => {
    toast.error(message, {
        position: toast.POSITION.TOP_CENTER
    });
}

export const FutureDates = (x) => {
    let date = new Date();
    let dateArray = [];
    for (var i = 1; i<=x; i++) {
        let loopDate = new Date(date);
        loopDate.setDate(date.getDate() + i);
        dateArray.push(loopDate.toLocaleString('en-us',{month:'short', day:'numeric'}));
    }

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(dateArray);
        }, 7000);
    });
}