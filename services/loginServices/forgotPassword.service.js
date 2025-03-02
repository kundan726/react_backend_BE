const sendEmail = require("../../utilities/mailservice");
const {
  buildResponse,
  main,
  throwErrorForMissingFields,
} = require("../../utilities/utilities");
const bcrypt = require("bcrypt");
const forgotPassword = async (req, res) => {
  try {
    const { email, password, otp } = req?.body;
    const receivedData = { email, password, otp };

    const fetchOtpParams = {
      action: "fetchOtp",
      data: { otp, email },
    };
    const fetchOtpResponse = await main(fetchOtpParams);

    console.log("fetchOtpResponse", fetchOtpResponse);

    if (fetchOtpResponse?.isVerified) {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      receivedData.password = hashedPassword;

      const params = { action: "updateUser", data: receivedData };
      const response = await main(params);
      const emailContent = {
        to: email,
        subject: "Forgot Password",
        text: "Password reset successful!",
        html: `
          <div style="font-family: Arial, sans-serif; color: #333; text-align: center; padding: 20px; border: 1px solid #ddd; border-radius: 10px; max-width: 400px; margin: auto;">
            <h2 style="color: #007bff;">Password Reset Successful</h2>
            <p>Hello,</p>
            <p>Your password has been successfully reset.</p>
            <hr style="border: 0; border-top: 1px solid #eee;">
            <p style="font-size: 12px; color: #666;">This is an automated message, please do not reply.</p>
          </div>
        `,
      };

      try {
        await sendEmail(emailContent);
      } catch (emailError) {
        console.error("Email sending failed:", emailError);
        return {
          statusCode: 500,
          response: null,
          msg: "Password reset but email sending failed",
        };
      }

      return {
        statusCode: 200,
        response: null,
        msg: "Password reset successfully. Please check your email.",
      };
    }
  } catch (error) {
    return {
      statusCode: 500,
      response: null,
      msg: error.message || "Something went wrong",
    };
  }
};

module.exports = { forgotPassword };
