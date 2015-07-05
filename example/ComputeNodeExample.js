var ComputeNode = require("../ComputeNode");

// A name for this type of node
var name = "FriendList";

// List of input names that will get connected via the graph
var inputs = [
	"friends", // Array of friendId
	"people" // Map of personId -> personData
];

// This function will get called once all the inputs have been recieved at least once
// The return of the function will be sent out via the `result` output
//
// Whenever the friends list or the store of people's data changes,
// this function will merge the two into a list of friend's data
var computeList = function (friends, people) {
	return friends.reduce(function (list, friend) {
		var friendData = people[friend];

		if (friendData) list.push(friendData);

		return list;
	}, []);
}

// Export the node definition using the ComputeNode factory
module.exports = ComputeNode(name, inputs, computeList);
