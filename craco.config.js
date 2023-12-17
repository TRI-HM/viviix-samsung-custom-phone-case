const cracoAlias = require("craco-alias");

module.exports = {
 plugins: [
  {
   plugin: cracoAlias,
   options: {
    baseUrl: "./src",
    source: "jsconfig",
    jsConfigPath: "./jsconfig.json",
   },
  },
 ],
};