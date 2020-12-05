#!/usr/bin/env node
import figlet from 'figlet';
import { program } from 'commander';
import dotenv from 'dotenv';
import chalkify from './utils/chalkify.js';
import create from './actions/create.js';
import run from './actions/run.js';
import submit from './actions/submit.js';

dotenv.config({
  path: '/Users/dragos/Desktop/Personal Projects/aoc-cli/.env',
});

program
  .version('1.0.0')
  .name('aoc')
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
  { name: 'output', extension: 'txt', isTask: false },
];

program
  .command('create <day>')
  .description(
    chalkify('Creates Advent of Code template for the daily puzzles', [
      'bold',
      'red',
    ])
  )
  .option(
    '-l, --language <lang>',
    'the language the tasks will be solved in (its extension)',
    'py'
  )
  .action((day, command) => {
    const { language } = command;
    create('', template, day, language);
  });

program
  .command('submit <task>')
  .description(
    chalkify(
      'Submits to Advent of Code your solution of a puzzle (first or second puzzle of a day)',
      ['bold', 'yellow']
    )
  )
  .option(
    '-l, --language <lang>',
    'the language the tasks will be solved in (its extension)',
    'py'
  )
  .option('-d, --day <day>', 'the day to submit the output for', 1)
  .option(
    '-r, --run',
    'if specified, runs the program befor submitting',
    false
  )
  .option(
    '-p, --path <path>',
    'the path to the daily challange dir',
    '.'
  )
  .action((task, command) => {
    const { day, run: runBefore, language, path } = command;
    Promise.resolve(runBefore ? run(language, task, path) : Promise.resolve(''))
      .then(() => submit(day, task))
  });

program
  .command('run <task>')
  .description(
    chalkify('Runs your solution for a puzzle', ['bold', 'blue'])
  )
  .option(
    '-l, --language <lang>',
    'the language the tasks will be solved in (its extension)',
    'py'
  )
  .option(
    '-p, --path <path>',
    'the path to the daily challange dir',
    '.'
  )
  .action((task, { language, path }) => {
    run(language, task, path);
  });

program.parse(process.argv);
