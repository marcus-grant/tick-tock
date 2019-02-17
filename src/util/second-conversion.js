import SECS from '../constants/time-constants';

export const tenMinutesFromSeconds = (sec, sixtyLimit = true) => {
  const limit = sixtyLimit ? SECS.HOUR : SECS.HUNDRED_MINUTES;
  if (sec < limit) {
    if (sec < SECS.TEN_MINUTES) return 0;
    if (sec < SECS.TWENTY_MINUTES) return 1;
    if (sec < SECS.HALF_HOUR) return 2;
    if (sec < SECS.HOUR - SECS.TWENTY_MINUTES) return 3;
    if (sec < SECS.HOUR - SECS.TEN_MINUTES) return 4;
    if (sec < SECS.HOUR) return 5;
    if (sec < SECS.HOUR + SECS.TEN_MINUTES) return 6;
    if (sec < SECS.HOUR + SECS.TWENTY_MINUTES) return 7;
    if (sec < SECS.HOUR + SECS.HALF_HOUR) return 8;
    return 9;
  }
  return sec % (sixtyLimit ? SECS.HOUR : SECS.TEN_MINUTES);
};

export const singleMinutesFromSeconds = (sec) => {
  if (sec < SECS.TEN_MINUTES) {
    if (sec < SECS.MINUTE) return 0;
    if (sec < SECS.TWO_MINUTES) return 1;
    if (sec < SECS.TWO_MINUTES + SECS.MINUTE) return 2;
    if (sec < SECS.FIVE_MINUTES - SECS.MINUTE) return 3;
    if (sec < SECS.FIVE_MINUTES) return 4;
    if (sec < SECS.FIVE_MINUTES + SECS.MINUTE) return 5;
    if (sec < SECS.FIVE_MINUTES + SECS.TWO_MINUTES) return 6;
    if (sec < SECS.TEN_MINUTES - SECS.TWO_MINUTES) return 7;
    if (sec < SECS.TEN_MINUTES - SECS.MINUTE) return 8;
    return 9;
  }
  return sec % SECS.MINUTE;
};

export const tenSecondsFromSeconds = (sec) => {
  if (sec < SECS.MINUTE) {
    if (sec < 10) return 0;
    if (sec < 20) return 1;
    if (sec < 30) return 2;
    if (sec < 40) return 3;
    if (sec < 50) return 4;
    return 5;
  }
  return sec % 60;
};

// expand types of decimals
export const decimalDigitsFromSeconds = (sec) => {
  let remain = sec;
  const tenMinutes = tenMinutesFromSeconds(remain, false);
  remain -= (tenMinutes * SECS.TEN_MINUTES);
  const minutes = singleMinutesFromSeconds(remain);
  remain -= minutes * SECS.MINUTE;
  const tenSeconds = tenSecondsFromSeconds(remain);
  remain -= tenSeconds * 10;
  return {
    tenMinutes,
    minutes,
    tenSeconds,
    seconds: Math.floor(remain),
  };
};
