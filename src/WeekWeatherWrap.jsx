
import Graybox from './Graybox'; 
import styles from './WeekWeatherWrap.module.css';


export default function WeekWeatherWrap({children}){
    return(
        <section className={styles['week-weather-wrap']}>
            <Graybox boxTitle="This Week ">
                {children}
            </Graybox>
        </section>
    );
}