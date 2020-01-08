const cheerio = require("cheerio");
const axios = require("axios");

const HOST = "https://xxxxxx.com";

const entry = `${HOST}/show/93.html`;

async function main() {
  axios.get(entry).then(response => {
    const htmlStr = response.data.toString();
    const $ = cheerio.load(htmlStr);
    const subPages = $(".stui-content__playlist")
      .slice(0)
      .find("li > a")
      .map((_, node) => {
        return node.attribs.href;
      })
      .toArray()
      .map(href => `${HOST}${href}`);

    console.info("$", $, subPages);
  });
}

main();

process.stdin.on("data", data => {
  console.info("~");
});
