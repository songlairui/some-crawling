const fs = require("fs");
const path = require("path");

const syncFile = {
  key_file: path.resolve(__dirname, "_keys_.json"),
  urlMap: {},
  urlHash: {},
  init() {
    if (Object.keys(syncFile.urlMap).length === 0) {
      if (fs.existsSync(syncFile.key_file)) {
        const data = fs.readFileSync(syncFile.key_file);
        const { urlMap, urlHash } = JSON.parse(data);
        syncFile.urlMap = urlMap || {};
        syncFile.urlHash = urlHash || {};
      } else {
        fs.writeFileSync(syncFile.key_file, "{}");
      }
    }
  },
  addKey(url, hash) {
    syncFile.urlMap[url] = hash;
    syncFile.urlHash[hash] = url;
    fs.writeFileSync(
      syncFile.key_file,
      JSON.stringify(
        { urlMap: syncFile.urlMap, urlHash: syncFile.urlHash },
        null,
        1
      )
    );
  }
};

syncFile.init();

const hash = str =>
  Array.prototype.reduce
    .call(
      str,
      (result, char) => {
        result = (result << 5) - result + char.charCodeAt(0);
        result |= 0;
        return result;
      },
      0
    )
    .toString();

const cache = {
  set(url, str) {
    const id = hash(url);
    syncFile.addKey(url, id);
    fs.writeFileSync(path.resolve(__dirname, "_cache", id), str);
  },
  get(url) {
    const id = hash(url);
    const file = path.resolve(__dirname, "_cache", id);
    if (fs.existsSync(file)) {
      console.info("use cache", url, id);
      return fs.readFileSync(file);
    }
    return false;
  }
};

module.exports = {
  cache
};
