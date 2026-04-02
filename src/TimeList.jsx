import TimeItem from "./TimeItem";
import styles from './TimeWeatherWrap.module.css'; 

export default function TimeList({weatherData, dailyData}){
    /* 현재 시간으로 부터 24시간 후 까지 보여준다. */
    const oneDayMin = 24 * 60 * 60 * 1000;
    const now = new Date(); 
    const setDate = new Date(now.getTime() + oneDayMin); 
    const fromDay = formatDate(now);
    const toDay = formatDate(setDate)
    const setHour = setDate.getHours();

    const checkIsDay = (time) =>{
        const sunSetTime = Number(dailyData.sunset[dailyData.sunset.findIndex((dateString)=> dateString.includes(fromDay))].split('T')[1].split(':')[0]) ; 
        const sunRiseTime = Number(dailyData.sunrise[dailyData.sunrise.findIndex((dateString)=> dateString.includes(toDay)) ].split('T')[1].split(':')[0]) ; 
        return (sunRiseTime < parseInt(time) && parseInt(time) < sunSetTime); 
    }
    const hourArray = [
            {[fromDay] : weatherData[fromDay].filter((item) => parseInt(item.time) >= setHour)}, 
            {[toDay] : weatherData[toDay].filter((item) => parseInt(item.time) <= setHour) }
        ].map((data)=>{
            const [date, weatherData] = Object.entries(data)[0]; 
            return weatherData.map((hourWeatherData) => {
                return ({
                    ...hourWeatherData, 
                    date, 
                    isDay : checkIsDay(hourWeatherData.time, dailyData)
                })
            });
        }); 
    const totalTimeList = hourArray.reduce((acc, current)=> acc.concat(current), []); 
    
    return(
        <div className="scroll-box">
            <ul className={`${styles['time-list']} inner-list`}>
                {
                    totalTimeList.map((timeData, i) => {
                        const {time, weathercode, temper, date, isDay} = timeData; 
                        return (
                            <TimeItem 
                                time={time}  
                                weathercode={weathercode}
                                temper={temper}
                                date={date}
                                key={`${date}-${i}`}
                                isDay={isDay}
                            />
                        )
                    })
                }
            </ul>
        </div>
    ); 
}

function formatDate(date) {
    const fullYear = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0'); 
    const dd = String(date.getDate()).padStart(2, '0'); 
    return `${fullYear}-${mm}-${dd}`
}





