var MQTTEmitter = require("mqtt-emitter");
var SubEmitter = require("subemitter");
var Graph = require("./core/Graph");

module.exports = runGraph;

/**
 * Runs a given graph definition
 * @param  {Object}      graph A graph defined using json-graph
 * @return {MQTTEmitter}       The event emitter used for connecting the nodes
 */
function runGraph(graph) {
	var events = new MQTTEmitter();
	var created = Graph(graph, require.main.require).create(events);

	return {
		events: events,
		dispose: dispose
	};

	function dispose() {
		events.removeAllListeners();
		return created.dispose();
	}
}
