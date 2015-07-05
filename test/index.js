describe.skip("ValueNode", function () {
	it.skip("should have no inputs", function () {});
	it.skip("should set one output", function () {});
	it.skip("should emit the value it was configured with", function () {});
	it.skip("should emit the value asynchronously", function () {});
	it.skip("should be disposable", function () {});
});

describe.skip("DeclarativeNode", function () {
	it.skip("should build the input list from the input map", function () {});
	it.skip("should pass the output list along", function () {});
	it.skip("should properly set the name", function () {});
	it.skip("should set the initial state properly", function () {});
	it.skip("should be able to ignore the initial state", function () {});
	it.skip("should call the dispose function if it's provided", function () {});
	it.skip("should register input events", function () {});
	it.skip("should pass on the payload from inputs to the input function", function () {});
	it.skip("should define all outputs", function () {});
	it.skip("should have output functions emit to the output", function () {});
});

describe.skip("InputAwaitingNode", function () {
	it.skip("should pass the input list along", function () {});
	it.skip("should pass the output list along", function () {});
	it.skip("should properly set the name", function () {});
	it.skip("should set the initial state properly", function () {});
	it.skip("should be able to ignore the initial state", function () {});
	it.skip("should call the dispose function if it's provided", function () {});
	it.skip("should call the update function once all inputs are recieved", function () {});
	it.skip("should call the update function every time an input changes", function () {});
	it.skip("should have the proper `this` value within the update function", function () {});
});

describe.skip("ComputeNode", function () {
	it.skip("should pass the input list along", function () {});
	it.skip("should have one `result` output", function () {});
	it.skip("should properly set the name", function () {});
	it.skip("should call the compute function once all inputs are recieved", function () {});
	it.skip("should send result of the compute function to the `result` output", function () {});
});

describe.skip("ConsoleNode", function () {
	it.skip("should have `level`, `data`, and `prefix` as inputs", function () {});
	it.skip("should have no outputs", function () {});
	it.skip("should call `console.log` by default", function () {});
	it.skip("should respect changes in the prefix", function () {});
	it.skip("should respect changes in the log level", function () {});
});
