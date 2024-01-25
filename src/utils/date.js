export const todayDateText = (isWeek) => {
  const today = new Date();
  const monthDay =
    today.getDate() > 9 ? today.getDate() : "0" + today.getDate();

  return isWeek
    ? getWeekName(today.getDay()) +
        ", " +
        monthDay +
        " " +
        getMonthName(today.getMonth()) +
        " " +
        today.getFullYear()
    : [today.getDate(), getMonthName(today.getMonth()), today.getFullYear()];
};

export const joinedDate = (joinedDate) => {
  const date = new Date(joinedDate);
  const monthDay = date.getDate() > 9 ? date.getDate() : "0" + date.getDate();

  return (
    monthDay + " " + getMonthName(date.getMonth()) + " " + date.getFullYear()
  );
};

export const dateString = (dateVar) => {
  const date = new Date(dateVar);
  const monthDay = date.getDate() > 9 ? date.getDate() : "0" + date.getDate();

  return (
    monthDay +
    " " +
    getMonthName(date.getMonth()).slice(0, 3) +
    " " +
    date.getFullYear()
  );
};

export const getClock = (dateData) => {
  const date = new Date(dateData);
  return `${date.getHours() < 10 ? "0" + date.getHours() : date.getHours()}:${
    date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()
  }`;
};

export const getAge = (birtdDate) => {
  return new Date().getFullYear() - new Date(birtdDate).getFullYear();
};

export const getActivityDate = (date) => {
  const activityDate = new Date(date);
  const now = new Date();

  if (now.getFullYear() == activityDate.getFullYear()) {
    if (now.getMonth() == activityDate.getMonth()) {
      if (now.getDate() == activityDate.getDate()) {
        if (now.getHours() == activityDate.getHours()) {
          if (now.getMinutes() == activityDate.getMinutes()) {
            if (now.getMilliseconds() == activityDate.getMilliseconds()) {
              return `0 sekund oldin`;
            }
            return `${
              now.getSeconds() - activityDate.getSeconds()
            } sekund oldin`;
          }
          return `${now.getMinutes() - activityDate.getMinutes()} daqiqa oldin`;
        }
        return `${now.getHours() - activityDate.getHours()} soat oldin`;
      }
      return `${now.getDate() - activityDate.getDate()} kun oldin`;
    }
    return `${now.getMonth() - activityDate.getMonth()} oy oldin`;
  }
  return `${now.getFullYear() - activityDate.getFullYear()} yil oldin`;
};

export const getPaymentDate = (from, to) => {
  const fromDate = new Date(from);
  const toDate = new Date(to);

  if (fromDate.getFullYear() === toDate.getFullYear()) {
    return [
      `${getMonthDate(fromDate.getDate())} ${getMonthName(
        fromDate.getMonth()
      ).slice(0, 3)} - ${getMonthDate(toDate.getDate())} ${getMonthName(
        toDate.getMonth()
      ).slice(0, 3)}`,
      fromDate.getFullYear(),
    ];
  }

  return [
    `${getMonthDate(fromDate.getDate())} ${getMonthName(
      fromDate.getMonth()
    ).slice(0, 3)} ${fromDate.getFullYear()} - `,
    `${getMonthDate(toDate.getDate())} ${getMonthName(toDate.getMonth()).slice(
      0,
      3
    )} ${toDate.getFullYear()}`,
  ];
};

const getMonthDate = (date) => {
  return date > 9 ? date : "0" + date;
};

const getWeekName = (num) => {
  switch (num) {
    case 1:
      return "Monday";
    case 2:
      return "Tuesday";
    case 3:
      return "Wednesday";
    case 4:
      return "Thursday";
    case 5:
      return "Friday";
    case 6:
      return "Saturday";
    case 0:
      return "Sunday";
  }
};

export const getMonthName = (num) => {
  switch (num) {
    case 0:
      return "January";
    case 1:
      return "February";
    case 2:
      return "March";
    case 3:
      return "April";
    case 4:
      return "May";
    case 5:
      return "June";
    case 6:
      return "July";
    case 7:
      return "August";
    case 8:
      return "September";
    case 9:
      return "October";
    case 10:
      return "November";
    case 11:
      return "December";
  }
};

export function getDates(startDate, endDate, status) {
  let currentDate = new Date(startDate);
  let toDate = new Date(endDate);
  const dates = [];

  while (currentDate < toDate) {
    dates.push({ date: new Date(currentDate), status });
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
}
