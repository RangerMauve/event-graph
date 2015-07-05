# event-graph
Make an application by composing nodes in a graph. Uses events behind the scenes.

```
npm install --save event-graph
```

**Note: this is currently a work in progress**

## Example
This graph will set up two nodes:
- `helloworld` is a Value node which gets configured to emit a value after the graph has been initialized. Value nodes are the only ones that can be configured via the graph definition. All other types of nodes must use inputs for their configuration.
- `console` is a ConsoleNode which is a type defined in the core of event-graph. Among other inputs, ConsoleNodes have a `data` input which takes arbitrary data and logs it to the console.

The graph also defines one edge which hooks up the `value` output of the `helloworld` node to the `data` input of the `console` node. The `source` and `target` attributes specify the ids of the nodes to connect. And the `output` and `input` attributes are used to specify which input from the `source` node is connected to which output from the `target` node.

graph.json

```json
{
    "graph": {
        "type": "ExampleGraph",
        "nodes": [{
            "id": "helloworld",
            "type": "Value",
            "metadata": {
                "value": "Hello World"
            }
        }, {
            "id": "console",
            "type": "event-graph/core/ConsoleNode"
        }],
        "edges": [{
            "source": "helloworld",
            "target": "console",
            "metadata": {
                "output": "value",
                "input": "data"
            }
        }]
    }
}
```

example.js:

```javascript
var EventGraph = require("event-graph");

var graphConfig = require("./graph.json");

var graph = EventGraph(graphConfig);
var events = graph.events;

// graph.events is an instance of mqtt-emitter
events.on("#", function (data, params, path) {
    console.log("Event:", path, ":", data);
});

// graph.dispose(); will clean up resources
```
