export const getLessonTimes = (times) => {
  let reqTimes = [];
  times.forEach((t) => {
    reqTimes.push({
      day: t.day === 6 ? 0 : t.day + 1,
      fromTime:
        t.fromHour +
        Math.round((t.fromMinute / 12 + Number.EPSILON) * 100) / 100,
      toTime:
        t.toHour + Math.round((t.toMinute / 12 + Number.EPSILON) * 100) / 100,
    });
  });
  return reqTimes;
};

export const getLessonTimesForUpdate = (lessonTimes) => {
  return lessonTimes
    ?.map((lt) => ({
      day: lt.day == 0 ? 6 : lt?.day - 1,
      fromHour: Math.floor(lt.fromTime),
      fromMinute: Math.round((lt.fromTime - Math.floor(lt.fromTime)) * 12),
      toHour: Math.floor(lt.toTime),
      toMinute: Math.round((lt.toTime - Math.floor(lt.toTime)) * 12),
    }))
    .sort((a, b) => a.day - b.day);
};
