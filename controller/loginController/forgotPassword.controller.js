const { buildResponse } = require('../../utilities/utilities');
const { forgotPassword } = require('../../services/loginServices/forgotPassword.service');

const forgotPasswordController = async (req, res) => {
    try {
        const serviceResponse = await forgotPassword(req, res);
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
}

module.exports = { forgotPasswordController }