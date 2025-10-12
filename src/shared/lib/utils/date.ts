export const getCurrentTimestamp = (): { timestampMonth: string; timestampTime: string } => {
  const currentDate = new Date();
  const time = currentDate.toLocaleTimeString();
  const monthDay = currentDate.toLocaleDateString(undefined, {
    month: "long",
    day: "numeric",
  });
  
  return {
    timestampMonth: monthDay.length <= 8 ? monthDay : monthDay.slice(0, monthDay.length - 4),
    timestampTime: time.slice(0, -3),
  };
};