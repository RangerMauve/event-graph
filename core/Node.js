var noop = require("no-op");

// Export the Name of the node to render as the label
module.exports.name = "Node";

// Export an array of strings that are the node input names
module.exports.inputs = [];

// Export an array of strings that are the node input names
module.exports.outputs = [];

/**
 * Export a function that will hook the node into the graph via an event emitter
 * @param  {MqttEmitter} events The event emitter for scoped to this node
 * @param  {Object}      node   The node's config from the graph. This should be avoided unless you're doing something really fancy
 * @return {Disposable}         Returns an object that has a `dispose()` method
 */
module.exports.create = function(events, node) {
	// Start listening on events.
	// The events will automatically get prefixed for you

	// Return an object with a "dispose" method that will clean up all resources
	return {
		dispose: noop
	}
}
