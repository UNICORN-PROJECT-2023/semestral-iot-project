export default class DateUtils {

  static getAgeFromDate(date) {
    const currentDate = new Date();
    const timeDifference = currentDate - date;
    const millisecondsInSecond = 1000;
    const millisecondsInMinute = millisecondsInSecond * 60;
    const millisecondsInHour = millisecondsInMinute * 60;
    const millisecondsInDay = millisecondsInHour * 24;
    const millisecondsInMonth = millisecondsInDay * 30; // Assumption: 30 days per month
    const millisecondsInYear = millisecondsInDay * 365; // Assumption: 365 days per year

    let ageString = '';
    let unit = '';

    if (timeDifference >= millisecondsInYear) {
      const years = Math.floor(timeDifference / millisecondsInYear);
      unit = 'year';
      ageString = `${years} ${unit}${years > 1 ? 's' : ''}`;
    } else if (timeDifference >= millisecondsInMonth) {
      const months = Math.floor(timeDifference / millisecondsInMonth);
      unit = 'month';
      ageString = `${months} ${unit}${months > 1 ? 's' : ''}`;
    } else if (timeDifference >= millisecondsInDay) {
      const days = Math.floor(timeDifference / millisecondsInDay);
      unit = 'day';
      ageString = `${days} ${unit}${days > 1 ? 's' : ''}`;
    } else if (timeDifference >= millisecondsInHour) {
      const hours = Math.floor(timeDifference / millisecondsInHour);
      unit = 'hour';
      ageString = `${hours} ${unit}${hours > 1 ? 's' : ''}`;
    } else if (timeDifference >= millisecondsInMinute) {
      const minutes = Math.floor(timeDifference / millisecondsInMinute);
      unit = 'minute';
      ageString = `${minutes} ${unit}${minutes > 1 ? 's' : ''}`;
    } else {
      const seconds = Math.floor(timeDifference / millisecondsInSecond);
      unit = 'second';
      ageString = `${seconds} ${unit}${seconds > 1 ? 's' : ''}`;
    }

    return ageString || 'just now';
  }


}