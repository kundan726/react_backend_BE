const loginModel = require("../models/loginModel");
const { otpModel } = require("../models/otpModel");
const createUser = async (params) => {
  try {
    const response = await loginModel.create(params?.data);
    console.log("response in createUser", response);
    return response;
  } catch (error) {
    console.log("Error", error);
    throw error;
  }
};

const fetchOneUser = async (params) => {
  try {
    const response = await loginModel.findOne({ email: params?.data }).lean();
    return response;
  } catch (error) {
    console.log("Error", error);
    throw error;
  }
};

const storeOtp = async (params) => {
  try {
    const response = await otpModel.create(params?.data);
    return response;
  } catch (error) {
    console.log("Error", error);
    throw error
  }
};

const fetchOtp = async (params) => {
  try {
    const { email, otp } = params?.data;
    const response = await otpModel.findOne({ email, otp }).lean();
    return response;
  } catch (error) {
    console.log("Error", error);
    throw error;
  }
};

const updateOtpDocument = async (params) => {
  try {
    const { email, otp } = params?.data;
    const response = await otpModel.findOneAndUpdate(
      { email, otp },
      { $set: { isVerified: true, isExpired: true } }, // Correct syntax
      { new: true } // Returns the updated document
  )
    return response;
  } catch (error) {
    console.log("Error", error);
    throw error;
  }
};

module.exports = { createUser, fetchOneUser, storeOtp, fetchOtp, updateOtpDocument };
