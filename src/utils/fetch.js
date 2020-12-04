import axios from 'axios';

const year = 2020;

const fetchDayInput = async (day) => {
  const { COOKIE: cookie } = process.env;
  let inputData = '';
  await axios
    .get(`https://adventofcode.com/${year}/day/${day}/input`, {
      headers: { cookie },
    })
    .then(({ data }) => {
      inputData = data;
    })
    .catch(() => '');
  return inputData;
};

export default fetchDayInput;
