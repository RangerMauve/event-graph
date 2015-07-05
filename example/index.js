var util = require("util");
var runGraph = require("../index.js");

var graphConfig = require("./ExampleGraph");

var graph = runGraph(graphConfig);
var events = graph.events;

events.on("#", function (data, params, path) {
	console.log("Event:", path, ":", data);
});

graph.dispose();
