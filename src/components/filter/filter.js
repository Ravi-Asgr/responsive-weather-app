import filterstyles from "./filter.module.css";
// import datetimestyles from "../datetime/datetime.module.css";
// import searchstyles from "../search/search.module.css";
import PropTypes from 'prop-types';
import { DateFromTs } from "../../util";

export const Filter = ({
    weatherData,
    placeHolder,
    onFocus,
    onChange,
    onKeyDown,
    city
}) => {
    return (
        <div className={filterstyles.wrapper}>
            <div className={filterstyles.ts}>
                {weatherData && Object.keys(weatherData).length != 0 && (
                    <h2>{DateFromTs(weatherData.dt, weatherData.timezone)}</h2>
                )}
            </div>
            <input
                className={filterstyles.search}
                type="text"
                placeholder={placeHolder}
                onFocus={onFocus}
                onChange={onChange}
                onKeyDown={onKeyDown}
                value={city} />

        </div>
    );
};

Filter.propTypes = {
    weatherData: PropTypes.object,
    placeHolder: PropTypes.node,
    onFocus: PropTypes.func,
    onChange: PropTypes.func,
    onKeyDown: PropTypes.func,
    city: PropTypes.string
}