const Responses = require("../common/API_responses");
const Dynamo = require("../common/Dynamo");

const tableName = process.env.tableNameWebsocket;

exports.handler = async (event) => {
  console.log("event", event);

  const { connectionId: connectionID } = event.requestContext;

  await Dynamo.delete(connectionID, tableName);

  return Responses._200({ message: "disconnected" });
};
