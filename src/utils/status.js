export const getColorStatus = (status) => {
  switch (status) {
    case "PROCESS":
    case "NEW":
      return "warning";
    case "ACTIVE":
      return "success";

    case "COMPLETED":
    case "LEAVED":
      return "secondary";
    case "UNPAID":
      return "danger";
    default:
      return "primary";
  }
};
