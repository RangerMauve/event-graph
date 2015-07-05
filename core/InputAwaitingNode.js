var DeclarativeNode = require("./DeclarativeNode");
var xtend = require("xtend");

module.exports = InputAwaitingNode;

/**
 * This node takes a list of inputs, and executes a function once all inputs
 * have been recieved at least once, and every time one updates after that.
 * Takes a list of outputs that can be sent to via `this.output.OUTPUTNAME(data)`
 * Persistant data should be saved in properties of `this`
 * @param  {String}   name          The name of the new Node type being created
 * @param  {Array}    inputs        List of input names
 * @param  {Array}    outputs       List of output names this node will provide
 * @param  {Function} update        Function that gets called when inputs update. Takes arguments that correspond to the list of inputs
 * @param  {Function} initial_state Optional funcction that returns the initial state for the
 * @param  {Function} dispose       Optional function that will be called to clean up the state of the node
 * @return {Node}                   The new Node definition
 */
function InputAwaitingNode(name, inputs, outputs, update, initial_state, dispose) {
	var input_map = inputs.reduce(function (map, name) {
		map[name] = function (data) {
			this.input[name] = data;
			var _input = this._input;
			_input[name] = true;
			if (!has_all_inputs(_input)) return;
			var args = as_list(this.input);
			update.apply(this, args);
		}
		return map;
	});

	return DeclarativeNode(name, input_map, outputs, initial_state, dispose);

	function state() {
		var state = default_initial_state();
		if (initial_state)
			stae = xtend(state, initial_state());
	}

	function as_list(input) {
		return inputs.map(function (name) {
			return input[name];
		});
	}

	function has_all_inputs(input) {
		return inputs.every(function (name) {
			return input[name];
		});
	}
}

function default_initial_state() {
	return {
		input: {},
		_input: {}
	};
}
