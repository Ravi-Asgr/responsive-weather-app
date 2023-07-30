import PropTypes from 'prop-types';

export const WeatherDetail = ({ children }) => {
  return <div className='grid px-5 pb-5 sm:px-0 grid-cols-1 w-full'>{children}</div>
};

WeatherDetail.propTypes = {
  children : PropTypes.node
};