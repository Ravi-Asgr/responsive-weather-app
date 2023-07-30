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

        <div className='flex justify-between w-full ml-2 sm:max-h-fit sm:ml-0 sm:mt-5'>
            {weatherData && Object.keys(weatherData).length != 0 && (
                <h2 className='sm:text-xl font-bold self-start min-w-fit'>
                    {DateFromTs(weatherData.dt, weatherData.timezone)}
                </h2>
            )}

            <input className='px-2 sm:mr-5 rounded-md md:rounded-lg text-right border md:border-2 border-gray-300 outline-0 self-start sm:h-8 overflow-hidden'
                type="text" placeholder={placeHolder} onFocus={onFocus} onChange={onChange} onKeyDown={onKeyDown}
                value={city}>
            </input>
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