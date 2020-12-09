import fs from 'fs';
import path from 'path';
import api from '../utils/api.js';
import scrapers from '../utils/scrapers.js';

const { postAnswer } = api;
const { getSolutionFeedback } = scrapers;

const readAnswer = async (pathToDir) => {
  const pathToOutput = path.resolve(pathToDir, 'output.txt');
  if (fs.existsSync(pathToOutput)) {
    return fs.readFileSync(pathToOutput);
  }
  throw Error('No output file found');
};

function detectDay(day, pathToDir) {
  return day || Number(path.resolve(pathToDir).match(/\d/g));
}

const submit = async (day, task, pathToDir, inlineInput) => {
  return Promise.resolve(inlineInput || await readAnswer(pathToDir))
    .then((answer) => postAnswer(detectDay(day, pathToDir), task, answer))
    .then(getSolutionFeedback)
    .then(
      (feedback) =>
        `Answer submitted succesfully.\nDay: ${detectDay(
          day,
          pathToDir
        )} Task: ${task}\nFeedback: ${feedback}`
    )
    .catch((err) => `Submission failed. ${err}`)
    .then(console.log);
};

export default submit;
