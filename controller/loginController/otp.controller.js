const {
    buildResponse,
    throwErrorForMissingFields,
  } = require("../../utilities/utilities");
const {verifyOtpService, resendOtpService}  = require('../../services/loginServices/otp.service');

const verifyOtpController = async (req, res) => {
    try {
        const serviceResponse = await verifyOtpService(req, res);
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
        return res
      .status(500)
      .json(buildResponse(500, null, error?.message));
    }
};

module.exports = {verifyOtpController}