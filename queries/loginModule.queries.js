const loginModel = require("../models/loginModel");
const createUser = async (params) => {
  try {
    console.log("params", params);
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
    console.log("params", params);
    const response = await loginModel.findOne({ email: params?.data }).lean();
    return response;
  } catch (error) {
    console.log("Error", error);
    throw error;
  }
};

module.exports = { createUser, fetchOneUser };
