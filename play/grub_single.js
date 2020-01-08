const cheerio = require("cheerio");
const axios = require("axios");

const HOST = "https://xxxxxxx.com";

const entry = `${HOST}/play/93~0~18.html`;

async function main() {
  const iframeUrl = await axios.get(entry).then(response => {
    const htmlStr = response.data.toString();
    const $ = cheerio.load(htmlStr);
    const iframeUrl = $(".stui-player__video iframe").attr("src");
    console.info("iframeUrl", iframeUrl);
    return iframeUrl;
  });
  await axios.get(iframeUrl).then(response => {
    const htmlStr = response.data.toString();
    const $ = cheerio.load(htmlStr);
    console.info("$", { htmlStr, $ });
  });
}

main();

process.stdin.on("data", data => {
  console.info("~");
});
