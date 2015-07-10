var asap = require("asap");
var noop = require("no-op");

// Name is `Value`
exports.name = "Value";

// Has no inputs
exports.inputs = [];

// Has one output, `value` which gets data once after the node is created (asynchronously)
exports.outputs = ["value"];

exports.create = create;

/**
 * Creates a new node that emits a single value.
 * The the value gets set under the node's `metadata.value` property in the graph
 * @param  {MqttEmitter} events The events for the node
 * @param  {Object}      node   The config of the node from the graph. This is a fancy node type so it's OK to use this
 * @return {Disposable}         Object with a `dispose()` method
 */
function create(events, node) {
	asap(function() {
		events.emit("out/value", node.metadata.value);
	});

	return {
		dispose: noop
	};
}
