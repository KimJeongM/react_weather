import styles from './WeekWeatherWrap.module.css'
export default function WeekItem({day, minTemper, maxTemper, weatherCode}){

    const weatherGetDay = (day) =>{
        const dayName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']; 
        return dayName[new Date(day).getDay()]
    }
    return(
        <li className={styles['week-item']}>
            <div className={styles['date']}>{weatherGetDay(day)}</div>
            <div className={styles['status']}>
                <span className={`weather-icon weather-${weatherCode.AMCode} ${styles['w-ico']}`}></span>
                <span className={`weather-icon weather-${weatherCode.PMCode} ${styles['w-ico']}`}></span>
            </div>
            <div className={styles['item-temper']}>
                <span className={styles.lowest}>{minTemper}°</span>
                <span className={styles.highest}>{maxTemper}°</span>
            </div>
        </li>
    );
}

