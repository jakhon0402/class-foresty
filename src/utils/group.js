export function getMinuteNumberString(minute) {
  switch (minute) {
    case 0:
      return "00";
    case 1:
      return "05";
    case 2:
      return "10";
    case 3:
      return "15";
    case 4:
      return "20";
    case 5:
      return "25";
    case 6:
      return "30";
    case 7:
      return "35";
    case 8:
      return "40";
    case 9:
      return "45";
    case 10:
      return "50";
    case 11:
      return "55";
  }
}
