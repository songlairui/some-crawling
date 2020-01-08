const axios = require("axios");

const visit = url =>
  axios.get(url).then(response => {
    const htmlStr = response.data.toString();
    if (htmlStr.length < 50) {
      console.info({ htmlStr });
      throw new Error("unvalid HTML");
    }
    return htmlStr;
  });

module.exports = {
  visit
};
