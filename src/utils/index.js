export const getFormatedDate = () => {
  const currentDate = new Date();

  const options = {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };

  return currentDate.toLocaleString("en-Us", options);
};
