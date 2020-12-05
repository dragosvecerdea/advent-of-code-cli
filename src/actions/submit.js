import fs from 'fs';
import path from 'path';
import api from '../utils/api.js';
import scrapers from '../utils/scrapers.js';

const { postAnswer } = api;
const { getSolutionFeedback } = scrapers;

const readAnswer = async (pathToDir) => {
  return fs.readFileSync(path.resolve(pathToDir, 'output.txt')).toString();
};

/**
 * Action. Submits the output of a task and day to Advent of Code and logs the feedback
 * @param {Number} day the day to submit the puzzle answer for
 * @param {Number} task the task number to submit the puzzle answer for
 * @param {String} pathToDir the path to the dir with the answer (output.txt)
 */
const submit = (day, task, pathToDir) => {
  return readAnswer(pathToDir)
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
