var util = require("util");
var runGraph = require("../index.js");

var graph = require("./ExampleGraph");

var events = runGraph(graph);

events.on("#", function (data, params, path) {
	console.log("Event:", path, ":", data);
});
