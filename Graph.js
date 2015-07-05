var prop = require("prop");
var SubEmitter = require("subemitter");

var ValueNode = require("./ValueNode");

var has_metadata = prop("metadata");
var get_id = prop("id");
var is_input = prop("metadata.input");
var is_output = prop("metadata.output");
var get_type = prop("type");

module.exports = Graph;

function Graph(config, require) {
	var graph = config.graph;
	var metanodes = graph.nodes.filter(has_metadata);
	var inputs = metanodes.filter(is_input).map(get_id);
	var outputs = metanodes.filter(is_output).map(get_id);
	var name = graph.type;

	return {
		name: name,
		inputs: inputs,
		outputs: outputs,
		create: create
	};

	function create(events) {
		// Set up edges
		graph.edges.filter(has_metadata).forEach(add_edge);

		// Create all the graph's nodes, they should in turn start listening on thir events
		var nodes = graph.nodes.filter(get_type).map(create_node);

		return {
			dispose: dispose
		};

		function dispose() {
			return nodes.map(dispose_node);
		}

		function dispose_node(node) {
			node.dispose();
		}

		function create_node(node) {
			var type = node.type;
			var node_events = new SubEmitter(events, node.id + "/");
			var Node;
			if (type === "Value") {
				Node = ValueNode(node.metadata.value);
			} else {
				Node = require(node.type);
			}

			var created = Node.create(node_events);

			return {
				dispose: function () {
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

		function relay(output, input) {
			events.on(output, function (data) {
				try {
					events.emit(input, data);
				} catch (e) {
					events.emit("error", e);
				}
			});
		}
	}
}
