import jsdom from 'jsdom';
import TurndownService from 'turndown'


const getSolutionFeedback = (data) => {
  const dom = new jsdom.JSDOM(data);
  const rawFeedback = dom.window.document.querySelector('article p').innerHTML;
  const feedback = rawFeedback.substring(0, rawFeedback.indexOf('.'));
  return Promise.resolve(feedback);
};

const parsePuzzleStatement = (data) => {
  const dom = new jsdom.JSDOM(data);
  const statement = [];
  const turndown = new TurndownService()
  dom.window.document
    .querySelectorAll('.day-desc')
    .forEach((element) => statement.push(turndown.turndown(element.innerHTML)));
  return Promise.resolve(statement.join('\n\n'));
};

export default { getSolutionFeedback, parsePuzzleStatement };
