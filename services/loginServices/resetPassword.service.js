const sendEmail = require("../../utilities/mailservice");
const { buildResponse, main, throwErrorForMissingFields } = require("../../utilities/utilities");

const resetPassword = async (req, res) => {
  try {
    const { email } = req?.body;
    const receivedData = { email };
    await throwErrorForMissingFields(receivedData, [email]);
    const params = {
      action: "fetchOneUser",
      data: email,
    };
    let response = await main(params);
    if (!response) {
      return { statusCode: 200, response: null, msg: "User not found" };
    }
    const otp = Math.floor(
      Math.random() *
        (Number(process.env.OTP_MAX_LENGTH) -
          Number(process.env.OTP_MIN_LENGTH) +
          1) +
        Number(process.env.OTP_MIN_LENGTH)
    );

    console.log(otp);
    const emailContent = {
      to: email,
      subject: "OTP for email authentication",
      text: `Your OTP for password reset is: ${otp}`,
      html: `
            <div style="font-family: Arial, sans-serif; color: #333; text-align: center; padding: 20px; border: 1px solid #ddd; border-radius: 10px; max-width: 400px; margin: auto;">
                <h2 style="color: #007bff;">Password Reset Request</h2>
                <p>Hello,</p>
                <p>Your One-Time Password (OTP) for resetting your password is:</p>
                <p style="font-size: 22px; font-weight: bold; color: #ff6600;">${otp}</p>
                <p>This OTP is valid for <b>5 minutes</b>. Do not share it with anyone.</p>
                <p>If you did not request this, please ignore this email.</p>
                <hr style="border: 0; border-top: 1px solid #eee;">
                <p style="font-size: 12px; color: #666;">This is an automated message, please do not reply.</p>
            </div>
        `,
    };
    const emailResponse = await sendEmail(emailContent);
    const otpParams = {
      action: "storeOTP",
      data: {
        otp,
        email,
        emailMessageId: emailResponse?.response?.messageId,
        isVerified: false,
        expiresAt: Date.now() + 5*60*1000
      },
    };
    let otpResponse = await main(otpParams);
    if (process.env.NODE_ENV === "development") {
      console.log("Generated OTP:", otp);
      console.log("Storing OTP Response:", otpResponse);
      console.log("Email Response:", emailResponse);
    }
    return { statusCode: 200, response: null, msg: "OTP sent successfully. Please check your email." };    
  } catch (error) {
    return res.status(400).json(buildResponse(400, null, error?.message));
  }
};

module.exports = { resetPassword };
