const {
  buildResponse,
} = require("../../utilities/utilities");
const { loginService } = require("../../services/loginServices/login.service");

const loginController = async (req, res) => {
  try {
    const serviceResponse = await loginService(req, res);
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
    return res.status(400).json(buildResponse(400, null, error?.message));
  }
};

module.exports = { loginController };
