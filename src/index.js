#!/usr/bin/env node
import figlet from 'figlet';
import { program } from 'commander';
// eslint-disable-next-line import/extensions
import chalkify from './utils/chalkify.js';
// eslint-disable-next-line import/extensions
import create from './actions/createTemplate.js';

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
  .command('create')
  .description(
    chalkify('creates Advent of Code template ', ['bold', 'red'])
  )
  .option(
    '-d, --day <day>',
    'the day to create a template for. when not specified template for 25 days are created',
    0
  )
  .option(
    '-l, --language <lang>',
    'the language the tasks will be solved in (its extension)',
    'py'
  )
  .action((command) => {
    const { day, language } = command
    create('', template, day, language)
  });

program.parse(process.argv);
