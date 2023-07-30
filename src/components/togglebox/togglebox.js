import PropTypes from 'prop-types';
import { Tooltip } from 'react-tooltip';

export const ToggleBox = ({
    unitSystem,
    changeUnitFunction,
    weatherType,
    changeWeatherFunction,
    displayDates,
    choosenDay,
    toggleDay,
    forecastDayHour,
    toggleHour,
    toggleSelectDisabled
}) => {


    return (
        <>
            <main className='font-mono px-2 sm:px-10 py-10 w-full text-xs sm:text-base sm:font-medium bg-white sm:rounded-3xl shadow-2xl'>
                <div className='grid grid-cols-1 items-center gap-5 lg:grid-cols-[1.25fr_1.75fr] sm:gap-10'>

                    <div className='grid grid-cols-[1fr_2fr_2fr] items-center gap-5'>
                        <h2 className='text-sm sm:text-xl font-bold'>Unit</h2>
                        <div>
                            <input className='mr-2 accent-slate-600' type="radio" id="task-1" name="task-1"
                                value='metric' checked={unitSystem === 'metric'} onChange={changeUnitFunction} />
                            <label htmlFor="task-1">metric</label>
                        </div>
                        <div>
                            <input className='mr-2 accent-slate-600' type="radio" id="task-1" name="task-1"
                                value='imperial' checked={unitSystem === 'imperial'} onChange={changeUnitFunction} />
                            <label htmlFor="task-1">imperial</label>
                        </div>
                    </div>

                    <div className='grid grid-cols-[0.5fr_1fr_3.5fr] items-center gap-1 sm:gap-5'>
                        <h2 className='text-sm sm:text-xl font-bold'>Report</h2>
                        <div onClick={changeWeatherFunction}>
                            <a href="#" name='today'
                                className={`px-1 md:px-2 py-1 md:py-2 mr-1 text-white ${weatherType === 'today' ? 'bg-orange-500' : 'bg-black'}`}>
                                Today
                            </a>
                        </div>
                        <div className='grid grid-cols-[0.5fr_2.5fr] items-center'>
                            <div onClick={changeWeatherFunction}>
                                <a href="#" name='forecast'
                                    className={weatherType === 'forecast' ? 'bg-orange-500 px-1 md:px-2 py-1 md:py-2 mr-1 text-white' : 'bg-black px-1 md:px-2 py-1 md:py-2 mr-1 text-white'}>
                                    Forecast
                                </a>
                            </div>
                            {
                                displayDates.length > 0 && (
                                    <div id='selectDay' className='flex justify-around items-center'>
                                        <select value={choosenDay} onChange={toggleDay} disabled={toggleSelectDisabled}
                                            className='outline-0 bg-gray-50 border border-gray-300 text-gray-900 text-sm ml-1 h-7 md:h-9'>
                                            <option className='' data-index={0} value={displayDates[0]}>{displayDates[0]}</option>
                                            <option className='' data-index={1} value={displayDates[1]}>{displayDates[1]}</option>
                                            <option className='' data-index={2} value={displayDates[2]}>{displayDates[2]}</option>
                                        </select>
                                        <select value={forecastDayHour} onChange={toggleHour} disabled={toggleSelectDisabled}
                                            className='outline-0 bg-gray-50 border border-gray-300 text-gray-900 text-sm ml-1 h-7 md:h-9'>
                                            <option value="0">0 AM</option>
                                            <option value="3">3 AM</option>
                                            <option value="6">6 AM</option>
                                            <option value="9">9 AM</option>
                                            <option value="12">12 PM</option>
                                            <option value="15">15 PM</option>
                                            <option value="18">18 PM</option>
                                            <option value="21">21 PM</option>
                                        </select>
                                        { weatherType === 'today' &&
                                            <Tooltip anchorSelect="#selectDay">
                                                Click on Forecast!
                                            </Tooltip>
                                        }
                                    </div>
                                )
                            }
                        </div>
                    </div>

                </div>
            </main>

        </>
    );
};


ToggleBox.propTypes = {
    unitSystem: PropTypes.string,
    changeUnitFunction: PropTypes.func,
    weatherType: PropTypes.string,
    changeWeatherFunction: PropTypes.func,
    displayDates: PropTypes.array,
    choosenDay: PropTypes.string,
    toggleSelectDisabled: PropTypes.bool,
    toggleDay: PropTypes.func,
    forecastDayHour: PropTypes.string,
    toggleHour: PropTypes.func
}