var prop = require("prop");
var endsWith = require("ends-with");
var SubEmitter = require("subemitter");

var ValueNode = require("./ValueNode");

var has_metadata = prop("metadata");
var get_id = prop("id");
var get_type = prop("type");

module.exports = Graph;

function Graph(config, require) {
	var graph = config.graph;
	var nodes = graph.nodes || [];
	var edges = graph.edges || [];

	var inputs = nodes.filter(is_input).map(get_id);
	var outputs = nodes.filter(is_output).map(get_id);

	var name = graph.type;

	return {
		name: name,
		inputs: inputs,
		outputs: outputs,
		create: create
	};

	function create(events) {
		// Set up edges
		edges.filter(has_metadata).forEach(add_edge);

		// Set up graph inputs
		inputs.forEach(map_graph_input);

		// Set up graph outputs
		outputs.forEach(map_graph_output);

		// Create all the graph's nodes, they should in turn start listening on thir events
		var nodes_disposers = graph.nodes.filter(get_type).map(create_node);

		return {
			dispose: dispose
		};

		// Disposes all nodes created by this graph
		function dispose() {
			return nodes_disposers.map(dispose_node);
		}

		function dispose_node(node) {
			node.dispose();
		}

		function create_node(node) {
			var id = node.id;
			if (id === "in" || id === "out")
				throw new TypeError("Nodes can not be named `in` or `out`");

			var type = node.type;

			var node_events = new SubEmitter(events, id + "/");

			var Node = require(node.type);

			var created = Node.create(node_events, node);

			return {
				dispose: function() {
					node_events.removeAllListeners();
					return created.dispose();
				}
			};
		}

		function add_edge(edge) {
			var output = edge.source + "/out/" + edge.metadata.output;
			var input = edge.target + "/in/" + edge.metadata.input;
			relay(output, input);
		}

		function map_graph_input(name) {
			relay("in/" + name, name + "/out/input");
		}

		function map_graph_output(name) {
			relay(name + "/in/output", "out/" + name);
		}

		function relay(output, input) {
			events.on(output, function(data) {
				try {
					events.emit(input, data);
				} catch (e) {
					events.emit("error", e);
				}
			});
		}
	}
}

function is_input(node) {
	return endsWith(node.type, "GraphInputNode");
}

function is_output(node) {
	return endsWith(node.type, "GraphOutputNode");
}
