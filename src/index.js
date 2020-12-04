#!/usr/bin/env node
import figlet from 'figlet';
import { program } from 'commander';
import dotenv from 'dotenv';
// eslint-disable-next-line import/extensions
import chalkify from './utils/chalkify.js';
// eslint-disable-next-line import/extensions
import create from './actions/create.js';
import runTask from './actions/run.js';

dotenv.config();

program
  .version('1.0.0')
  .name('aoc')
  .usage('[command] <options>')
  .description(
    chalkify(
      figlet.textSync('Advent Of Code  -  CLI', {
        horizontalLayout: 'full',
      }),
      ['rgb(66,105,47)']
    )
  );

const template = [
  { name: 'task1', extension: 'py', isTask: true },
  { name: 'task2', extension: 'py', isTask: true },
  { name: 'input', extension: 'txt', isTask: false },
  { name: 'output', extension: 'txt', isTask: false },
];

program
  .command('day <day>')
  .description(
    chalkify('creates Advent of Code template for the day', [
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
    chalkify('creates Advent of Code template for the day', [
      'bold',
      'red',
    ])
  )
  .option(
    '-l, --language <lang>',
    'the language the tasks will be solved in (its extension)',
    'py'
  )
  .option(
    '-d, --day <day>',
    'the language the tasks will be solved in (its extension)',
    ''
  )
  .action((task, {language, day}) => {
    runTask(language, task, day)
  });

program.parse(process.argv);
