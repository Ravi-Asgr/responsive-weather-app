import PropTypes from 'prop-types';

export const WeatherParam = ({ title, iconSrc, metric, unit }) => {
  return (
    <div className='grid grid-cols-1 bg-white rounded-xl items-end p-2'>
      <div className='text-right'>
        <p className='font-bold mr-2'>{title}</p>
      </div>
      <div className='grid grid-cols-2 shrink-0 items-start gap-2'>
        <div className='w-20 h-20 text-center' >
          <img className='object-cover' src={iconSrc} alt="weatherIcon" />
        </div>
        <div className='text-center'>
          <p className='text-xl sm:text-2xl font-bold'>{metric}</p>
          <p className='font-bold sm:text-xl'>{unit}</p>
        </div>
      </div>
    </div>
  );
}

WeatherParam.propTypes = {
  title: PropTypes.string,
  iconSrc: PropTypes.string,
  metric: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  unit: PropTypes.string
}