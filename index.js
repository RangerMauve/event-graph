var MQTTEmitter = require("mqtt-emitter");
var SubEmitter = require("subemitter");
var Graph = require("./Graph");

module.exports = runGraph;

/**
 * Runs a given graph definition
 * @param  {Object}      graph A graph defined using json-graph
 * @return {MQTTEmitter}       The event emitter used for connecting the nodes
 */
function runGraph(graph) {
	var events = new MQTTEmitter();
	Graph(graph, require.main.require).create(events);

	return events;
}
