import fs from 'fs';
import path from 'path';
import api from '../utils/api.js';
import scrapers from '../utils/scrapers.js';

const { postAnswer } = api;
const { getSolutionFeedback } = scrapers;

const readAnswer = async (pathToDir) => {
  return fs.readFileSync(path.resolve(pathToDir, 'output.txt')).toString();
};

function detectDay(day) {
  return day || Number(process.cwd().match(/\d/g));
}

const submit = (day, task, pathToDir) => {
  return readAnswer(pathToDir)
    .then((answer) => postAnswer(detectDay(day), task, answer))
    .then(getSolutionFeedback)
    .then(
      (feedback) =>
        `Answer submitted succesfully.\nDay: ${detectDay(day)} Task: ${task}\nFeedback: ${feedback}`
    )
    .catch('Submission failed')
    .then(console.log);
};

export default submit;
