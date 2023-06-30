const AWS = require("aws-sdk");

const SES = new AWS.SES();

exports.handler = async (event) => {
  console.log("event", event);

  const email = event.Input.Payload.email;

  const message = `Hi,
  We saw you signed up for our gaming platform but haven't played yet.
  
  We hopr you play soon`;

  const from = "adrianascrobote@gmail.com";

  const subject = "Remember to use the gaming platform";

  const params = {
    Destination: {
      ToAddresses: [email],
    },
    Message: {
      Body: {
        Text: { Data: message },
      },
      Subject: { Data: subject },
    },
    Source: from,
  };

  try {
    await SES.sendEmail(params).promise();
    return;
  } catch (error) {
    console.log("error sending email: ", error);
    throw error;
  }
};
