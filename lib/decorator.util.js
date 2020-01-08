const cheerio = require("cheerio");

const { cache } = require("./cache.util");

const addLog = (fn, title = fn.name) =>
  function(...args) {
    console.group(`fn: ${title}`, ...args);
    const result = fn.apply(this, args);
    console.groupEnd();
    return result;
  };

const addCache = fn =>
  async function(url) {
    const cachedData = cache.get(url);
    if (cachedData) {
      return cachedData;
    }
    const result = await fn(url);
    cache.set(url, result);
    return result;
  };

const cheerioIfy = fn =>
  function(...args) {
    return fn.apply(this, args).then(htmlStr => cheerio.load(htmlStr));
  };

module.exports = {
  cheerioIfy, // return then(str=>cheerio.load(str))
  addLog, // add log
  addCache // add cache
};
