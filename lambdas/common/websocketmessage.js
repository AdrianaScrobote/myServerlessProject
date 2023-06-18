const AWS = require("aws-sdk");

const create = (domainName, stage) => {
  const endpoint = `${domainName}/${stage}`;
  return new AWS.ApiGatewayManagementApi({
    apiVersion: "2023-06-18",
    endpoint,
  });
};

const send = ({ domainName, stage, connectionID, message }) => {
  const ws = create(domainName, stage);

  const postParams = {
    Data: message,
    connectionId: connectionID,
  };

  return ws.postToConnection(postParams).promise();
};

module.exports = {
  send,
};
