var DeclarativeNode = require("./DeclarativeNode");

var name = "Console";

var input = {
	level: function (level) {
		this.level = level;
	},
	prefix: function (prefix) {
		this.prefix = prefix;
	},
	data: function (data) {
		console[this.level](this.prefix || "", data);
	}
};

var output = [];

var state = function () {
	return {
		prefix: "LOG:",
		level: "log"
	};
};

module.exports = DeclarativeNode(name, input, output, state);
