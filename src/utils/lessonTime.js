export function getLessonTimesString(lessonTimes) {
  if (lessonTimes.length === 1)
    return {
      day: getWeekDayAbb(lessonTimes[0].day),
      time: getTime(lessonTimes[0]),
    };

  return findDuplicates(lessonTimes);
}

export const getTime = (lessonTime) => {
  return `${getHourMinuteFromTime(
    lessonTime.fromTime
  )} - ${getHourMinuteFromTime(lessonTime.toTime)}`;
};

function findDuplicates(lessonTimes) {
  let arr = [...lessonTimes];
  let dayName = "";
  let newArr = [];
  let willCutArr = [];
  for (let i = 0; i <= arr.length - 1; i++) {
    dayName = dayName + getWeekDayAbb(arr[i].day) + " ";

    for (let j = i + 1; j < arr.length; j++) {
      if (
        arr[i].fromTime == arr[j].fromTime &&
        arr[i].toTime == arr[j].toTime
      ) {
        dayName = dayName + getWeekDayAbb(arr[j].day) + " ";

        willCutArr.push(j);
      }
    }
    for (var k = willCutArr.length - 1; k >= 0; k--)
      arr.splice(willCutArr[k], 1);
    willCutArr = [];
    newArr.push({ day: dayName, time: getTime(arr[i]) });
    dayName = "";
  }
  return [...newArr];
}

export function sortLessonTimesByRoom(lessonTimes) {
  let arr = [...lessonTimes];

  let newArr = [];
  let willCutArr = [];
  let sortedLessonTimes = [];
  for (let i = 0; i <= arr.length - 1; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i].roomName == arr[j].roomName) {
        sortedLessonTimes.push(arr[j]);

        willCutArr.push(j);
      }
    }
    for (var k = willCutArr.length - 1; k >= 0; k--)
      arr.splice(willCutArr[k], 1);
    willCutArr = [];
    sortedLessonTimes.push(arr[i]);
    newArr.push({
      roomNumber: arr[i].roomName,
      lessonTimes: sortedLessonTimes,
    });
    sortedLessonTimes = [];
  }
  return [...newArr];
}

export function getHourMinuteFromTime(time) {
  let hour = Math.floor(time);
  let minute = Math.round((time - Math.floor(time)) * 12) * 5;

  if (hour < 10) {
    if (minute < 10) {
      return `${"0" + hour}:${"0" + minute}`;
    }
    return `${"0" + hour}:${minute}`;
  }

  if (minute < 10) {
    return `${hour}:${"0" + minute}`;
  }

  return `${hour}:${minute}`;
}

export function getWeekDayAbb(day) {
  switch (day) {
    case 0:
      return "Yak.";
    case 1:
      return "Du.";
    case 2:
      return "Se.";
    case 3:
      return "Chor.";
    case 4:
      return "Pay.";
    case 5:
      return "Ju.";
    case 6:
      return "Sha.";
  }
}
