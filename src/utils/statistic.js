import moment from "moment";

export const parseStatisticsDuration = (time) => {
  const result = moment.duration(time, `minutes`);
  return {
    hours: result.hours(),
    minutes: result.minutes()
  };
};

export const getTorGenere = (wachedFilms) => {
  if (!wachedFilms.length) {
    return `-`;
  }
  const allGenere = {};
  let maxValue = 0;
  let genereValue;
  wachedFilms.forEach((film) => {
    [...film.genre].forEach((genre) => {
      allGenere[genre] = (allGenere[genre] || 0) + 1;
    });
  });

  for (let key in allGenere) {
    if (maxValue < allGenere[key]) {
      maxValue = allGenere[key];
      genereValue = key;
    }
  }

  return genereValue;
};
