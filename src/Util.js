export function getDateAddZero(date){
    const dateArray = date.split('-')
    return dateArray.map((item) =>(item < 10)? '0' + item : item).join('-');
}

export function getTimeAddZero(time){
    const timeArray = time.split(':'); 
    timeArray[0] = (timeArray[0] < 10)? '0' + timeArray[0] : timeArray[0]; 
    return timeArray.join(':'); 
}

export function getSplitArray(str, splitString = 'T'){
    return str.split(splitString); 
}

export function getNumberTime(time) {
    return Number(String(time).split(':')[0]); 
}

export function formatDate(date) {
    const fullYear = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0'); 
    const dd = String(date.getDate()).padStart(2, '0'); 
    return `${fullYear}-${mm}-${dd}`
}