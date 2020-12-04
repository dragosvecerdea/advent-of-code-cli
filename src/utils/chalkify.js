import chalk from 'chalk'

const chalkify = (message, theme) => {
  return chalk`{${theme.join('.')} ${message}}`;
};

export default chalkify
