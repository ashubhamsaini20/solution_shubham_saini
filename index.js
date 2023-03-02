// solution_shubham_saini

// importing module
const fs = require("fs");
//
const JsonClicksData = require("./clicks.json");
const filterClicksFunc = require("./filterClicksHelper.js");
//

const filteredClicksData = filterClicksFunc(JsonClicksData);
var content = JSON.stringify(filteredClicksData ? filteredClicksData : []);

fs.writeFile("result-set.json", content, "utf8", function (err) {
  if (err) {
    console.log("Error occured during writing.");
    return console.log(err);
  }
  console.log("file saved.");
});
