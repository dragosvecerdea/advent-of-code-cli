import axios from 'axios';

const fetchDayInput = async (day) => {
  const { COOKIE: cookie, URL, YEAR } = process.env;
  return axios.get(`${URL}/${YEAR}/day/${day}/input`, {
    headers: { cookie },
  });
};

const postAnswer = async (day, task, answer) => {
  const { COOKIE: cookie, URL, YEAR } = process.env;
  return axios({
    method: 'post',
    url: `${URL}/${YEAR}/day/${day}/answer`,
    data: `level=${task}&answer=${answer}`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      cookie,
    },
  })
    .then(({ data }) => data)
    .catch((err) => `Submit was unsuccessful. Check you cookie and internet connection ${err}`);
};

export default { fetchDayInput, postAnswer };
