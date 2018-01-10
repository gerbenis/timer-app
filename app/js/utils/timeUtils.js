const formatTimeSection = time => (time >= 10 ? time : `0${time}`);

export const formatTime = (time) => {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time - (hours * 3600)) / 60);
  const seconds = time - (hours * 3600) - (minutes * 60);

  return `${formatTimeSection(hours)}:${formatTimeSection(minutes)}:${formatTimeSection(seconds)}`;
};

export const formatTimeDecimal = (time) => {
  const hours = time / 3600;

  return hours.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export const validateTimeString = (timeString, isDecimal) => {
  const validationRegex = isDecimal ? /^\d+\.\d{1,2}$/ : /^\d+(:(0|1|2|3|4|5)\d){2}$/;

  return timeString.match(validationRegex);
};

export const parseTimeString = (timeString, isDecimal) => {
  let seconds;

  if (isDecimal) {
    seconds = Math.floor(Number(timeString) * 3600);
  } else {
    const parts = timeString.match(/^(\d+):(\d+):(\d+)$/);
    seconds = (3600 * Number(parts[1])) + (60 * Number(parts[2])) + Number(parts[3]);
  }

  return seconds;
};
