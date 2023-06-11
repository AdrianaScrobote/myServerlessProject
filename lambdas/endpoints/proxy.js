const Responses = require("../common/API_responses");

exports.handler = async (event) => {
  console.log("event", event);

  return Responses._200();
};
