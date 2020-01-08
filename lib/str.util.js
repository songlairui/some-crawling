const getSubPages = $ =>
  $(".stui-content__playlist")
    .slice(0)
    .find("li > a")
    .map((_, node) => {
      return node.attribs.href;
    })
    .toArray()
    .map(href => `https://1090ys.com${href}`);

const getIframeUrl = $ => $(".stui-player__video iframe").attr("src");

const getVideoUrls = $ => {
  return (
    (
      $("script")
        .last()
        .get()[0].children[0].data || ""
    ).match(/('|")https?:\/\/.*?\.mp4.*?('|")/g) || []
  );
};

module.exports = {
  getSubPages,
  getIframeUrl,
  getVideoUrls
};
