/** Fresh at each build — used for sitemap entries without file dates */
module.exports = function () {
  return {
    isoDate: new Date().toISOString().slice(0, 10),
  };
};
