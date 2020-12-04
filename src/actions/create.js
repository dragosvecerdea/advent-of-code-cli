import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import fetchDayInput from '../utils/fetch.js';

const getTasksWithLanguage = (files, language) => {
  return files.map((file) => {
    return file.isTask
      ? {
          ...file,
          extension: language,
        }
      : file;
  });
};

const loadInputFiles = async (pathToFile, day) => {
    let dayInput
    await fetchDayInput(day).then((data) => { dayInput = data })
    fs.writeFileSync(pathToFile, dayInput);
};

const createFilesFromTemplate = (
  pathToFiles,
  template,
  day,
  taskLanguage = 'py'
) => {
  getTasksWithLanguage(template, taskLanguage).forEach(
    ({ name, extension }) => {
      const pathToFile = path.resolve(
        pathToFiles,
        [name, extension].join('.')
      );
      fs.openSync(pathToFile, 'w');
      name.includes('input') ? loadInputFiles(pathToFile, day) : null;
    }
  );
};

const createDirFromTemplate = (
  pathToDir,
  template,
  day,
  taskLanguage
) => {
  const pathToFiles = path.join(pathToDir, `day${day}`);
  fs.existsSync(pathToFiles) || fs.mkdirSync(pathToFiles);
  createFilesFromTemplate(pathToFiles, template, day, taskLanguage);
};

const create = (
  pathToWorkspace,
  template,
  day = 0,
  language = 'py'
) => {
  const days = day !== 0 ? [day] : _.range(1, 26);
  days.forEach((currentDay) =>
    createDirFromTemplate(
      pathToWorkspace,
      template,
      currentDay,
      language
    )
  );
};

export default create;
