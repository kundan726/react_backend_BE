const { main } = require("../../utilities/utilities");
const { throwErrorForMissingFields } = require("../../utilities/utilities");

const verifyOtpService = async (req, res) => {
  try {
    const { otp, email } = req?.body;
    if (!otp || !email) {
      throw new Error("Please provide correct details");
    }

    const fetchOtpParams = {
      action: "fetchOtp",
      data: {
        otp,
        email,
      },
    };
    const fetchOtpResponse = await main(fetchOtpParams);
    console.log("fetchOtpResponse", fetchOtpResponse);
    if(fetchOtpResponse?.isVerified){
        throw new Error("OTP already verified!");
    }
    if (!fetchOtpResponse?.expiresAt || fetchOtpResponse.expiresAt < Date.now()) {
        throw new Error("OTP expired! Please request new OTP");
    }
    const updateOtpDocument = {
        action: 'updateOtpDocument',
        data: {
            otp,
            email,
        }
    }
    await main(updateOtpDocument);
    return {
      statusCode: 201,
      response: {},
      msg: "Otp verified successfully",
    };
  } catch (error) {
    return { statusCode: 500, response: null, msg: error.message };
  }
};

module.exports = { verifyOtpService };
