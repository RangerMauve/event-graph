var noop = require("no-op");

module.exports = DeclarativeNode;

/**
 * Maps inputs to functions that get called every time the input data is recieved
 * The functions will have access to the same state via the `this` keyword
 * Outputs will get mapped to `this.output.OUTPUTNAME(data)` which are funcions that take
 * data which will get sent to the output
 * @param  {String}   name          The name of the new Node type
 * @param  {Object}   input_map     A map of inputName -> inputHandlerFunction
 * @param  {Array}    output_names  THe list of output names
 * @param  {Function} initial_state Optional function that returns the initial state
 * @param  {Function} dispose       Optional function that will be called to clean up the state of the node
 * @return {Node}                   The Node definition
 */
function DeclarativeNode(name, input_map, output_names, initial_state, dispose) {
	var input_names = Object.keys(input_map);
	initial_state = initial_state || default_state;

	return {
		inputs: input_names,
		outputs: output_names,
		create: create
	};

	function create(events) {
		var state = initial_state();

		input_names.forEach(function (name) {
			events.on("in/" + name, function (data) {
				try {
					input_map[name].call(state, data);
				} catch (e) {
					events.emit("error", e);
				}
			});
		});

		state.output = output_names.reduce(function (map, name) {
			map[name] = function (data) {
				events.emit("out/" + name, data);
			};
			return map;
		}, {});

		return {
			dispose: dispose || noop
		};
	}
}

function default_state() {
	return {};
}
