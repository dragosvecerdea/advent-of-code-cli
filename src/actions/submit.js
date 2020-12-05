import fs from 'fs';
import path from 'path';
import api from '../utils/api.js';
import scrapers from '../utils/scrapers.js';

const { postAnswer } = api;
const { getSolutionFeedback } = scrapers;

const readAnswer = async () => {
  return fs.readFileSync(path.resolve('.', 'output.txt')).toString();
};

const submit = (day, task) => {
  return readAnswer()
    .then((answer) => postAnswer(day, task, answer))
    .then(getSolutionFeedback)
    .then(
      (feedback) =>
        `Answer submitted succesfully.\nDay: ${day} Task: ${task}\nFeedback: ${feedback}`
    )
    .catch('Submission failed')
    .then(console.log);
};

export default submit;
