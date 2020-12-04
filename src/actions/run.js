import { exec as CMD } from 'child_process';
import fs from 'fs';
import path from 'path';

// eslint-disable-next-line no-extend-native
String.prototype.escape = function escape () { return this.replace(/ /g, '\\ ') }

function execLangauage(language, pathToDir, fileName) {
  const pathToFile = path.join(pathToDir, fileName).escape();
  const pathToInput = path.join(pathToDir, 'input.txt').escape();
  const extension = language;
  switch (language) {
    case 'js':
      return `cat ${pathToFile}.${extension}`;
    case 'py':
      return `cat ${pathToInput} | python ${pathToFile}.${extension}`;
    case 'java':
      return `javac ${pathToFile}.${extension} && cat ${pathToInput} | java ${pathToFile}`;
    default:
      return "echo 'Not a valid language'";
  }
}

const runTask = (language, task, day) => {
  const pathToDir = day ? `./day${day}` : './'
  const fileName = `task${task}`
  CMD(execLangauage(language, pathToDir, fileName), (_, stdout) => {
      console.log(stdout)
    fs.writeFileSync(path.join(pathToDir, 'output.txt'), stdout);
  });
};

export default runTask;
