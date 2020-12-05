import { execSync as CMD } from 'child_process';
import fs from 'fs';
import path from 'path';

// eslint-disable-next-line no-extend-native
String.prototype.shellEscape = function shellEscape() {
  return this.replace(/ /g, '\\ ');
};

function getCompileScript(language, pathToDir, fileName) {
  const pathToTask = path.join(pathToDir, fileName).shellEscape();
  const pathToInput = path.join(pathToDir, 'input.txt').shellEscape();
  const extension = language;
  switch (language) {
    case 'js':
      return `cat ${pathToInput} | node ${pathToTask}.${extension}`;
    case 'py':
      return `cat ${pathToInput} | python ${pathToTask}.${extension}`;
    case 'java':
      return `javac ${pathToTask}.${extension} && cat ${pathToInput} | java ${pathToTask}`;
    default:
      throw new Error();
  }
}

const runTask = async (language, task, pathToDir) => {
  const fileName = `task${task}`;
  return Promise.resolve(getCompileScript(language, pathToDir, fileName))
    .then((compileScript) =>
      CMD(compileScript, { stdio: [0, 'pipe', 'ignore'] }).toString()
    )
    .then((output) => {
      fs.writeFileSync(path.join(pathToDir, 'output.txt'), output);
      return `Run succesfully.\nOutput: ${output}`;
    })
    .catch((err) => `The task failed to run. ${err}`)
    .then(console.log)
};

export default runTask;
