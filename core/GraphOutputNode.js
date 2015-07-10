var noop = require("no-op");

exports.name = "GraphOutput";
exports.inputs = ["output"];
exports.outputs = [];
exports.create = create;

function create(events, node) {
	return {
		dispose: noop
	};
}
