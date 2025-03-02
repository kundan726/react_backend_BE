const { buildResponse } = require('../../utilities/utilities');
const { resetPassword } = require('../../services/loginServices/resetPassword.service');

const resetPasswordController = async (req, res) => {
    try {
        const serviceResponse = await resetPassword(req, res);
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

module.exports = { resetPasswordController }