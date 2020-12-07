#!/usr/bin/env node
import figlet from 'figlet';
import { program } from 'commander';
import dotenv from 'dotenv';
import path from 'path';
import chalkify from './utils/chalkify.js';
import init from './actions/init.js';
import run from './actions/run.js';
import submit from './actions/submit.js';

dotenv.config({
  path: path.resolve('AbsolutePathToEnv', '.env'),
});

program
  .version('1.0.0')
  .name('advent')
  .usage('[command] <options>')
  .description(
    chalkify(
      figlet.textSync('Advent Of Code  -  CLI', {
        horizontalLayout: 'full',
      }),
      ['blue']
    )
  );

const template = [
  { name: 'task1', extension: 'py', isTask: true },
  { name: 'task2', extension: 'py', isTask: true },
  { name: 'input', extension: 'txt', isInput: true },
  { name: 'output', extension: 'txt', isOutput: false },
  { name: 'statement', extension: 'md', isStatement: true },
];

program
  .command('init <day>')
  .description(chalkify('Creates Advent of Code template for the daily challange with puzzle\'s input and statement', ['bold', 'red']))
  .option('-l, --language <lang>', 'the language the tasks will be solved in (its extension)', 'py')
  .action((day, command) => {
    const { language } = command;
    init('', template, day, language);
  });

program
  .command('submit <task>')
  .description(
    chalkify(
      'Submits to Advent of Code your solution of a puzzle (first or second puzzle of a day)',
      ['bold', 'yellow']
    )
  )
  .option('-l, --language <lang>', 'The language of the tasks to be run (its extension)', 'py')
  .option(
    '-d, --day <day>',
    'The day to submit the output for. If not specified, the day is detected from the current working directory'
  )
  .option('-r, --run', 'If specified, runs the program befor submitting', false)
  .option('-p, --path <path>', 'The path to the daily challange dir', '.')
  .action((task, command) => {
    const { day, run: runBefore, language, path: pathToDir } = command;
    Promise.resolve(runBefore ? run(language, task, pathToDir) : Promise.resolve('')).then(() =>
      submit(day, task, pathToDir)
    );
  });

program
  .command('run <task>')
  .description(chalkify('Runs your solution for a puzzle', ['bold', 'blue']))
  .option('-l, --language <lang>', 'the language the tasks will be solved in (its extension)', 'py')
  .option('-p, --path <path>', 'the path to the daily challange dir', '.')
  .action((task, { language, path: pathToDir }) => {
    run(language, task, pathToDir);
  });

program.parse(process.argv);
