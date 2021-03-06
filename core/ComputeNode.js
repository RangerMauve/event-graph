var InputAwaitingNode = require("./InputAwaitingNode");

/**
 * Take multiple inputs and do a computation when one of them changes
 * Send results of computation to the "result" output
 * Although you can save extra state in the `this` keyword withing the function,
 * it isn't adviseable as this type of node is supposed to be more functional
 * @param  {String}   name    The name of the node
 * @param  {Array}    inputs  The list of input names
 * @param  {Function} compute The function used for computing a value. Takes arguments in the same order as the inputs
 * @return {Node}             The Node definition for the new type of Node
 */
function ComputeNode(name, inputs, compute) {.
	return InputAwaitingNode(name, inputs, ["result"], function () {
		var result = compute.apply(this, arguments);
		this.output.result(result);
	});
}
