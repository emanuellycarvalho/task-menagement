export function calculateTimeDifference(dateTime) {
    const targetDate = new Date(dateTime);
    const currentDate = new Date();

    const timeDifference = currentDate - targetDate;

    const minutesDifference = Math.floor(timeDifference / (1000 * 60));

    if (minutesDifference > 59) {
        const hoursDifference = Math.floor(minutesDifference / 60);
        if (hoursDifference > 23 && hoursDifference < 48) {
            return '1 day';
        }

        if (hoursDifference > 47) {
            const daysDifference = Math.floor(hoursDifference / 24);
            return daysDifference + ' days';
        }
        
        return hoursDifference + ' hours';
    } 
    
    if (minutesDifference < 2) {
        return minutesDifference + ' minute';
    }
    
    return minutesDifference + ' minutes';
}
  
export function toCamelCase(sentence) {
    return sentence
      .toLowerCase()
      .replace(/[-_]+(.)?/g, (_, chr) => (chr ? chr.toUpperCase() : ''));
  }