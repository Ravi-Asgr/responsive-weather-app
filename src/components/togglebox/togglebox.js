import styles from './togglebox.module.css';
import { ToggleBoxRadio } from '../toggleboxradio/toggleboxradio';
import PropTypes from 'prop-types';

export const ToggleBox = ({
    unitSystem,
    changeUnitFunction,
    weatherType,
    changeWeatherFunction,
    displayDates,
    choosenDay,
    toggleDay,
    forecastDayHour,
    toggleHour
}) => {


    return (
        <><div className={styles.togglebox}>
            <h2 className={styles.unitlabel}>Unit</h2>
            <div className={styles.metricflex}>
                <ToggleBoxRadio metric={'metric'} selectedMetric={unitSystem} changeUnitFunction={changeUnitFunction} />
                {/* <input type="radio" id="task-1" name="task-1" value="metric" checked={unitSystem==='metric'} className={styles.metricrradio} onChange={changeUnitFunction} />
                <label htmlFor="task-1">Metric</label> */}
            </div>
            <div className={styles.metricflex}>
                <ToggleBoxRadio metric={'imperial'} selectedMetric={unitSystem} changeUnitFunction={changeUnitFunction} />
                {/* <input type="radio" id="task-1" name="task-1" value="imperial" checked={unitSystem==='imperial'} className={styles.metricrradio} onChange={changeUnitFunction} />
                <label htmlFor="task-1">Imperial</label> */}
            </div>
        </div>
            <div className={[styles.togglebox, styles.toggleboxright].join(' ')}>
                <h2 className={styles.unitlabel}>Report type</h2>
                <div className={styles.metricflex} onClick={changeWeatherFunction}>
                    <a href="#" name="today" className={weatherType === "today" ? [styles.btnclick, styles.btn].join(' ') : styles.btn}>Today</a>
                </div>
                <div className={[styles.toggleboxequal, styles.togglebox].join(' ')}>
                    <div onClick={changeWeatherFunction}>
                        <a href="#" name="forecast" className={weatherType === "forecast" ? [styles.btnclick, styles.btn].join(' ') : styles.btn}>Forecast</a>
                    </div>
                    {
                        displayDates.length > 0 && (
                            <div className={weatherType === "forecast"
                                ? [styles.metricflex, styles.aligncenter].join(' ')
                                : [styles.metricflex, styles.aligncenter, styles.disabled].join(' ')}>
                                <a href="#" data-index={0} className={choosenDay === displayDates[0] ? [styles.datebtn, styles.btn, styles.btnclick].join(' ') : [styles.datebtn, styles.btn].join(' ')} onClick={toggleDay}>{displayDates[0]}</a>
                                <a href="#" data-index={1} className={choosenDay === displayDates[1] ? [styles.datebtn, styles.btn, styles.btnclick].join(' ') : [styles.datebtn, styles.btn].join(' ')} onClick={toggleDay}>{displayDates[1]}</a>
                                <a href="#" data-index={2} className={choosenDay === displayDates[2] ? [styles.datebtn, styles.btn, styles.btnclick].join(' ') : [styles.datebtn, styles.btn].join(' ')} onClick={toggleDay}>{displayDates[2]}</a>
                                <select value={forecastDayHour} onChange={toggleHour} className={styles.minimal}>
                                    <option value="0">0 AM</option>
                                    <option value="3">3 AM</option>
                                    <option value="6">6 AM</option>
                                    <option value="9">9 AM</option>
                                    <option value="12">12 PM</option>
                                    <option value="15">15 PM</option>
                                    <option value="18">18 PM</option>
                                    <option value="21">21 PM</option>
                                </select>
                            </div>
                        )
                    }
                </div>
            </div></>
    );
};


ToggleBox.propTypes = {
    unitSystem: PropTypes.string,
    changeUnitFunction: PropTypes.func,
    weatherType: PropTypes.string,
    changeWeatherFunction: PropTypes.func,
    displayDates: PropTypes.array,
    choosenDay: PropTypes.string,
    toggleDay: PropTypes.func,
    forecastDayHour: PropTypes.string,
    toggleHour: PropTypes.func
}