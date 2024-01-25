export function sentenceCase(str) {
  return str?.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

export function getPhoneNumberString(number) {
  return `+ 998 ${number?.replace(
    /\D*(\d{2})\D*(\d{3})\D*(\d{2})\D*(\d{2})\D*/,
    "$1 $2 $3 $4"
  )}`;
}

export function getMinuteNumberString(minute) {
  switch (minute) {
    case 0:
      return "00";
    case 1:
      return "15";
    case 2:
      return "30";
    case 3:
      return "45";
  }
}
