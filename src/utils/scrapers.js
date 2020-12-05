import jsdom from 'jsdom';

const getSolutionFeedback = (data) => {
  const dom = new jsdom.JSDOM(data);
  const rawFeedback = dom.window.document.querySelector('article p')
    .innerHTML;
  const feedback = rawFeedback.substring(
    0,
    rawFeedback.indexOf('<a href')
  );
  return Promise.resolve(feedback);
};

export default { getSolutionFeedback };
