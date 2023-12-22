export function calculateTimeDifference(dateTime) {
    const targetDate = new Date(dateTime);
    const currentDate = new Date();

    const timeDifference = currentDate - targetDate;

    const minutesDifference = Math.floor(timeDifference / (1000 * 60));

    if (minutesDifference > 59) {
        const hoursDifference = Math.floor(minutesDifference / 60);
        return hoursDifference + ' hours';
    } 
    
    return minutesDifference + ' minutes';
}
  
export function toCamelCase(sentence) {
    return sentence
      .toLowerCase()
      .replace(/[-_]+(.)?/g, (_, chr) => (chr ? chr.toUpperCase() : ''));
  }