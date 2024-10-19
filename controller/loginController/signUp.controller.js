const {
  signUpService,
} = require("../../services/loginServices/signUp.services");
const {
  buildResponse,
  throwErrorForMissingFields,
} = require("../../utilities/utilities");

const signUpController = async (req, res) => {
  try {
    console.log("req", req);
    const serviceResponse = await signUpService(req, res);
    return res
      .status(serviceResponse.statusCode)
      .json(
        buildResponse(
          serviceResponse.statusCode,
          serviceResponse.response,
          serviceResponse.msg
        )
      );
  } catch (error) {
    console.log("Error inside singupController", error);
    return res
      .status(500)
      .json(buildResponse(500, null, "Internal server error"));
  }
};

module.exports = { signUpController };
