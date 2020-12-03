import fs from 'fs';
import path from 'path';
import _ from 'lodash'

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

const createFilesFromTemplate = (pathToFiles, template, taskLanguage = 'py') => {
  getTasksWithLanguage(
    template,
    taskLanguage
  ).forEach(({ name, extension }) =>
    fs.openSync(
      path.resolve(pathToFiles, [name, extension].join('.')),
      'w'
    )
  );
};

const createDirFromTemplate = (
  pathToDir,
  name,
  template,
  taskLanguage
) => {
  const pathToFiles = path.join(pathToDir, name);
  fs.existsSync(pathToFiles) || fs.mkdirSync(pathToFiles);
  createFilesFromTemplate(pathToFiles, template, taskLanguage);
};

const create = (pathToWorkspace, template, day = 0, language = 'py') => {

    const days = day ? [day] : _.range(1,26)
    days.forEach(currentDay => createDirFromTemplate(pathToWorkspace, `day${currentDay}`, template, language))

}

export default create;
