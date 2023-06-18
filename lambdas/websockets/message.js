const Responses = require("../common/API_responses");
const Dynamo = require("../common/Dynamo");
const WebSocket = require("../common/websocketmessage");

const tableName = process.env.tableNameWebsocket;

exports.handler = async (event) => {
  console.log("event", event);

  const { connectionId: connectionID } = event.requestContext;

  const body = JSON.parse(event.body);

  try {
    const record = await Dynamo.get(connectionID, tableName);
    const { messages, domainName, stage } = record;

    messages.push(body.message);

    const data = {
      ...record,
      messages,
    };

    await Dynamo.write(data, tableName);

    await WebSocket.send({
      domainName,
      stage,
      connectionID,
      message: "this is a reply to your message",
    });

    return Responses._200({ message: "got a message" });
  } catch (error) {
    return Responses._400({ message: "message could not be received" });
  }
};
