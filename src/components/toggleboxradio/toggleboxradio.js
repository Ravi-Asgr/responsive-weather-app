import styles from './toggleboxradio.module.css';
import PropTypes from 'prop-types';

export const ToggleBoxRadio = ({metric, selectedMetric, changeUnitFunction}) => {
    return (
        <>
            <input type="radio" id="task-1" name="task-1" value={metric} checked={selectedMetric===metric} className={styles.metricrradio} 
                onChange={changeUnitFunction} />
            <label htmlFor="task-1">{metric}</label>
        </>
    );
}

ToggleBoxRadio.propTypes = {
    metric: PropTypes.string,
    selectedMetric: PropTypes.string,
    changeUnitFunction: PropTypes.func
}