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

const updateUser = async (params) => {
  try {
    console.log("+++++",params)
    if (!params?.data?.email || !params?.data?.password) {
      throw new Error("Email and password are required");
    }

    const response = await loginModel.findOneAndUpdate(
      { email: params.data.email },
      { $set: { password: params.data.password } },
      { new: true, runValidators: true }
    );

    if (!response) {
      throw new Error("User not found or update failed");
    }

    return response;
  } catch (error) {
    console.error("Error updating user:", error);
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

module.exports = { createUser, fetchOneUser, storeOtp, fetchOtp, updateOtpDocument, updateUser };
