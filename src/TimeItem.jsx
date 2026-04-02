import WeatherCode from './WeatherCode';
import styles from './TimeWeatherWrap.module.css'; 

export default function TimeItem({time, weathercode, temper, isDay}){
    return(
        <li className={styles['time-item']}>
            <span className={styles[time]}>{time.replace(':00', 'th')}</span>
            <span className={`weather-icon weather-${weathercode} ${styles['w-icon']} ${isDay? '' : 'night'}`}></span>
            <span className={styles['temper']}>{temper}°</span>
        </li>
    );
}


