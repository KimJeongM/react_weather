import Graybox from './Graybox'; 
import styles from './TimeWeatherWrap.module.css'; 
export default function TimeWeatherWrap({children}){
    return(
        <section className={styles['time-weather-wrap']}>
            {/* 여기서만 ::before, ::after를 활성화 시키고 싶다. */}
            <Graybox boxTitle="Weather by time zone"  pseudoBool="true">
                {children}
            </Graybox>
        </section>
    )
}