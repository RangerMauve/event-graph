var asap = require("asap");

module.exports = ValueNode;

/**
 * Creates a new node that emits a single value.
 * Value nodes are special in that they don't get requried like regular nodes and a value
 * node is configured inside the graph specification under the node's `metadata.value` property
 *
 * The value is emitted asynchronously to avoid releasing Zalgo
 * @param  {Any}  value The value the node will emit upon creation
 * @return {Node}       Returns the definition for a node that resolves to that value
 */
function ValueNode(value) {
	return {
		name: "Value",
		inputs: [],
		outputs: ["value"],
		create: create
	};

	function create(events) {
		asap(function () {
			events.emit("out/value", value);
		});
	}
}
