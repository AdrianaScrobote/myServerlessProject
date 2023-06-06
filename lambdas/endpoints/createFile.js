const Responses = require("../common/API_responses");
const S3 = require("../common/S3");

const bucket = process.env.bucketName;

exports.handler = async (event) => {
  console.log("event", event);

  if (!event.pathParameters || !event.pathParameters.fileName) {
    //failed without fileName
    return Responses._400({ message: "missing the fileName from the path" });
  }

  let fileName = event.pathParameters.fileName;

  let data = JSON.parse(event.body);

  const newData = await S3.write(data, fileName, bucket).catch((err) => {
    console.log("error in S3 write", err);
    return null;
  });

  if (!newData) {
    return Responses._400({ message: "Failed to write data by fileName" });
  }

  return Responses._200({
    newData,
  });
};
