const cheerio = require("cheerio");

const result = {
  htmlStr:
    "<html>\r\n" +
    "<head>\r\n" +
    '<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />\r\n' +
    '<meta name="referrer" content="never">\r\n' +
    '<meta name="viewport" content="width=device-width,height=device-height, user-scalable=no,initial-scale=1, minimum-scale=1, maximum-scale=1,target-densitydpi=device-dpi ">\r\n' +
    "</head>\r\n" +
    "\r\n" +
    '<div style="width:100%;height:100%;background:#000" id="player">\r\n' +
    "    \r\n" +
    "</div>\r\n" +
    "\r\n" +
    '<script src="https://xxx.xxxxxxx.xxx/flv.js/1.4.2/flv.min.js"></script>\r\n' +
    '<script src="https://xxx.xxxxxxx.xxx/dplayer/1.22.2/DPlayer.min.js"></script>\r\n' +
    '<link rel="stylesheet" href="https://xxx.xxxxxxx.xxx/dplayer/1.22.2/DPlayer.min.css">\r\n' +
    '<script type="text/javascript">\r\n' +
    "var buffering=false;\r\n" +
    "var last_time='';\r\n" +
    "var now_time='';\r\n" +
    "var same_time=0;\r\n" +
    "  var isiPad = navigator.userAgent.match(/iPad|iPhone|Android|Linux|iPod/i) != null;\r\n" +
    "  if(isiPad){\r\n" +
    `\tdocument.getElementById('player').innerHTML = '<video src="http://xx-xxxx-xxx-xx-xxx/%E7%94%9F%E6%B4%BB%E5%A4%A7%E7%88%86%E7%82%B8S12E19.mp4?ver=5199&rkey=d3759e55dee762c854d4f04d8b0b317c60796b7491ce3aad09e3340c2a15b01cbf9b1ef8033d6fa1ff2670bfd70b7377f14d27bb45d773b561ca7cedd329e6e3" controls="controls" preload="preload" poster="/dplayer/loading.gif" width="100%" height="100%" x-webkit-airplay="allow"></video>';\r\n` +
    "      }else {\r\n" +
    '\t\tvar pic = "https://xx.xxxx.xxx/kf/Hf17a6812984a48b9a340048752276b44s.jpg";\r\n' +
    "\t\tvar dplayer = new DPlayer({\r\n" +
    '\t\t\telement: document.getElementById("player"),\r\n' +
    "\t\t\tautoplay: 1,\r\n" +
    "\t\t\tvideo: {\r\n" +
    '\t\t\t\turl: "http://xx-xxxx-xxx-xx-xxx/%E7%94%9F%E6%B4%BB%E5%A4%A7%E7%88%86%E7%82%B8S12E19.mp4?ver=5199&rkey=d3759e55dee762c854d4f04d8b0b317c60796b7491ce3aad09e3340c2a15b01cbf9b1ef8033d6fa1ff2670bfd70b7377f14d27bb45d773b561ca7cedd329e6e3",\r\n' +
    "                pic: pic\r\n" +
    "\t\t\t       }\r\n" +
    "\t\t});\r\n" +
    "       }\r\n" +
    "</script>\r\n" +
    "</body>\r\n" +
    "</html>"
};

const $ = cheerio.load(result.htmlStr);

const scriptStr = $("script")
  .last()
  .get()[0].children[0].data;

const availableHref = scriptStr.match(/('|")https?:\/\/.*?\.mp4.*?('|")/g);

console.info("availableHref", availableHref);

process.stdin.on("data", data => {
  console.info("~");
});
