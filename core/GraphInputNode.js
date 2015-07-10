var noop = require("no-op");

exports.name = "GraphInput";
exports.inputs = [];
exports.outputs = ["input"];
exports.create = create;

function create(events, node) {
	return {
		dispose: noop
	};
}
