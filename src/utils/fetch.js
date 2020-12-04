import axios from 'axios';

const year = 2020;

const fetchDayInput = async (day) => {
  const { COOKIE: cookie, URL } = process.env;
  let inputData = '';
  await axios
    .get(`${URL}/${year}/day/${day}/input`, {
      headers: { cookie },
    })
    .then(({ data }) => {
      inputData = data;
    })
    .catch(() => '');
  return inputData;
};

export default fetchDayInput;
