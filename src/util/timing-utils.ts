export const getSecondsBetweenDates = (date1: Date, date2: Date) => {
  const dif = date1.getTime() - date2.getTime();
  const secondsBetweenDates = dif / 1000;
  return Math.abs(secondsBetweenDates);
};
