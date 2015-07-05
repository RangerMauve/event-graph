var DeclarativeNode = require("../DeclarativeNode");

// A name for this type of node
var name = "ExampleDeclarativeNode";

// Define the names of the outputs
// The `this` value of the functions will have a property called `output`
// This will have keys for the output names that correspond to functions
// which take one argument: the data to send to that output
var outputs = ["greeting"];

// Create a map of what to do when different inputs come in
var inputs = {
	// Whenever we get the name of somebody, greet them
	"name": function (name) {
		this.output.greeting(this.greetingType + " " + name);
	},
	// Whenever data is recieved on this input, change the greeting type
	"greetingType": function (type) {
		this.greetingType = type;
	}
}

// The initial state, this is the basis for the `this` context in the other functions
var initial_state = function () {
	return {
		// Set the initial value for the greetingType
		greetingType: "Hello"
	};
}

// Export the Node declaration using the DeclarativeNode factory
module.exports = DeclarativeNode(name, inputs, outputs, initial_state);
