const Responses = require("../common/API_responses");
const Dynamo = require("../common/Dynamo");

const tableName = process.env.tableNameWebsocket;

exports.handler = async (event) => {
  console.log("event", event);

  const {
    connectionId: connectionID,
    domainName,
    stage,
  } = event.requestContext;

  const data = {
    ID: connectionID,
    date: Date.now(),
    messages: [],
    domainName,
    stage,
  };

  await Dynamo.write(data, tableName);

  return Responses._200({ message: "connected" });
};
