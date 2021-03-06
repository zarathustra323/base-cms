const createError = require('http-errors');
const allPublishedContent = require('./all-published-content');
const websiteScheduledContent = require('./website-scheduled-content');

const parseJson = (value) => {
  try {
    return JSON.parse(value);
  } catch (e) {
    return null;
  }
};

const rss = ({ requiresInput = true } = {}) => (req, res, next) => {
  const { websiteContext: website } = res.locals;
  const { query } = req;
  if (requiresInput && !query.input) throw createError(400, 'No input was provided with the request.');
  const input = parseJson(query.input || '{}');
  const channel = parseJson(query.channel);
  if (!input) throw createError(400, 'The provided input is invalid.');
  res.locals.input = { ...input, pagination: { limit: 25, ...input.pagination } };
  res.locals.channel = channel || {};

  const mountPoint = req.get('x-mount-point') || req.query['mount-point'] || '/__rss';
  const useSelf = req.get('x-self-origin') || req.query['self-origin'];
  res.locals.mountHref = useSelf ? `${req.protocol}://${req.get('host')}${req.url}` : `${website.origin}${mountPoint}${req.url}`;

  res.setHeader('Content-Type', 'application/rss+xml; charset=utf-8');
  next();
};

module.exports = (app) => {
  app.get('/all-published-content.xml', rss({ requiresInput: false }), allPublishedContent);
  app.get('/website-scheduled-content.xml', rss(), websiteScheduledContent);
};
