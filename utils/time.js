module.exports.convertTimeToSecond = function (timeStr) {
  const defaultTime = 6;

  if (typeof timeStr !== "string") {
    return defaultTime;
  }

  timeStr = timeStr.toLowerCase();

  let time = parseInt(timeStr);
  if (timeStr.indexOf("s") > -1) {
    return time;
  } else if (timeStr.indexOf("m") > -1) {
    return time * 60;
  } else {
    return defaultTime;
  }
};
