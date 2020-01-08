const cheerio = require("cheerio");
const axios = require("axios");

const HOST = "https://another___site.com";

let entry = `${HOST}/xxxx.aspx?id=gHk3yjEw%2FtutFY2FsloFX3tuZdD7lcuYk312e4xt%2Bw%3D%3D`;

entry = `${HOST}/xxxx.aspx?id=gHk3yjEw%2FtutFY2FsloFX3tuZdD7lcuYk312eIds8w%3D%3D`;

async function main() {
  axios.get(entry).then(response => {
    const htmlStr = response.data.toString();
    const $ = cheerio.load(htmlStr);
    console.info("$", { htmlStr, $ });
  });
}

main();

process.stdin.on("data", data => {
  console.info("~");
});
