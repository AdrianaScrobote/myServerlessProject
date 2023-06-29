const Responses = require("../common/API_responses");
const Dynamo = require("../common/Dynamo");
const { withHooks, hooksWithValidation } = require("../common/hooks");
const yup = require("yup");

const tableName = process.env.tableName;

const bodySchema = yup.object().shape({
  score: yup.number().required(),
});

const pathSchema = yup.object().shape({
  ID: yup.string().required(),
});

const handler = async (event) => {
  if (!event.pathParameters || !event.pathParameters.ID) {
    //failed without Id
    return Responses._400({ message: "missing the ID from the path" });
  }

  let ID = event.pathParameters.ID;

  const { score } = event.body;

  const res = await Dynamo.update({
    tableName,
    primaryKey: "ID",
    primaryKeyValue: ID,
    updateKey: "score",
    updateValue: score,
  });

  return Responses._200({
    res,
  });
};

// exports.handler = withHooks(handler);
exports.handler = hooksWithValidation({ bodySchema, pathSchema })(handler);
