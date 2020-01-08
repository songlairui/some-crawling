const { visit: originVisit } = require("./axios.util");
const { getSubPages, getIframeUrl, getVideoUrls } = require("./str.util");
const { addLog, addCache, cheerioIfy } = require("./decorator.util");

const visit = cheerioIfy(addCache(addLog(originVisit)));

const entry = "https://1090ys.com/show/93.html";

async function main() {
  const subPages = await visit(entry).then(getSubPages);
  console.info("subPages", subPages);
  const result = [];
  for (subPage of subPages) {
    console.group("subPage", subPage);
    let videoUrls = undefined;
    try {
      const iframeUrl = await visit(subPage).then(getIframeUrl);
      videoUrls = await visit(iframeUrl).then(getVideoUrls);
    } catch (error) {
      console.info("error", subPage, error.message);
    }
    result.push(videoUrls);
    console.info("result", videoUrls);
    console.groupEnd();
  }

  const output = result
    .filter(Boolean)
    .map(arr => Array.from(new Set(arr))[0].slice(1, -1));

  console.info(output.join("\n"));
}

main();
