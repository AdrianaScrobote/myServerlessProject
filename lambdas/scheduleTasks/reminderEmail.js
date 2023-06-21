const AWS = require("aws-sdk");
const Responses = require("../common/API_responses");

const SES = new AWS.SES();

exports.handler = async (event) => {
  console.log("event", event);

  const message = `Hey Sam

  Don't forget to film next weeks serverless video`;

  const params = {
    Destination: {
      ToAddresses: ["adrianascrobote@gmail.com"],
    },
    Message: {
      Body: {
        Text: {
          Data: message,
        },
      },
      Subject: { Data: "reminder email" },
    },
    Source: "adrianascrobote@gmail.com",
  };

  try {
    await SES.sendEmail(params).promise();

    return Responses._200({ message: "email sent" });
  } catch (error) {
    console.log("error", error);
    return Responses._400({ message: "failed to send the email" });
  }
};
