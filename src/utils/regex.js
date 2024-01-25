export const getMoneyPattern = (val, splitBy = " ") => {
  if (val === 0) {
    return "0";
  }
  if (val) {
    return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, splitBy);
  }
};

export function getMoneyPatternInput(amount) {
  let cleanedData = cleanStringForRegex(amount);
  if (cleanedData.length === 9) cleanedData = cleanedData.slice(0, 8);
  return cleanedData.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

export function getPhoneNumberPattern(num) {
  let cleanedData = cleanStringForRegex(num);

  if (cleanedData.match(/(\d{2})(\d{3})(\d{2})(\d{2})\d{0,9}/)) {
    return cleanedData.replace(
      /(\d{2})(\d{3})(\d{2})(\d{2})\d{0,9}/,
      "($1) $2-$3-$4"
    );
  }

  if (cleanedData.match(/(\d{2})(\d{3})(\d{1,2})/)) {
    return cleanedData.replace(/(\d{2})(\d{3})(\d{1,2})/, "($1) $2-$3");
  }

  if (cleanedData.match(/(\d{2})(\d{1,3})/)) {
    return cleanedData.replace(/(\d{2})(\d{1,3})/, "($1) $2");
  }

  return cleanedData;
}

export function cleanStringForRegex(str) {
  return ("" + str).replace(/\D+/g, "");
}
