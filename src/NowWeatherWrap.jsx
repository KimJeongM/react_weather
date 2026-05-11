import styles from './NowWeatherWrap.module.css'; 
import WeatherCode from './WeatherCode';
import {getSplitArray} from './Util';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'

export default function NowWeatherWrap({nowWeather, popupHandler, weatherCity, dailyData}) {
    if(!nowWeather.length) return null; 
    const [obj] = nowWeather; 
    const isDay = parseInt(getSplitArray(getSplitArray(dailyData.sunrise[0])[1], ':')[0]) < new Date().getHours() 
                        && new Date().getHours() < parseInt(getSplitArray(getSplitArray(dailyData.sunset[0])[1], ':')[0]);
    const clickHandler = () => {
        popupHandler(true);
    }
    return(
        <section className={styles['now-weather-wrap']}>
            <div className={styles['now-position']}>{weatherCity}</div>
            <div className={styles['weather-state']}>
                <div 
                    className={styles['weather-code']} 
                    data-code={obj.weathercode}
                >
                    <span className={`weather-icon weather-${obj.weathercode} ${(isDay)? '' : 'night'}` }></span>
                </div>
                <div className={styles['temper']}>{obj.temper}°</div>
            </div>
            <button type="button" 
                className={styles['search-area']} 
                onClick={clickHandler}
            >
                {<FontAwesomeIcon icon={faLocationDot} style={{color:'rgb(51,51,51)'}}/>}
            </button>
        </section>
    );
}