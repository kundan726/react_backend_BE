const {
  throwErrorForMissingFields,
} = require("../../utilities/utilities");
const { main } = require("../../utilities/utilities");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const loginService = async (req, res) => {
  try {
    const { email, password } = req?.body;
    const receivedData = { email, password };
    await throwErrorForMissingFields(receivedData, [email, password]);
    const params = {
      action: "fetchOneUser",
      data: email,
    };
    let response = await main(params);
    console.log("response",response);
    if (response && response?.email == email) {
      const passwordMatch = await bcrypt.compare(password, response?.password);
      if (passwordMatch) {
        console.log("password matched")
        const token = jwt.sign({userId:response?._id, role: response?.role},process.env.JWT_SECRET_KEY, {'expiresIn': '1h'});
        let responseToSend = {...response,token}
        console.log("response",response,responseToSend,token)
        return {statusCode: 200, response:responseToSend, msg: 'Login successful'}
      } else {
        return {statusCode: 200, response:null, msg: 'Invalid credentials'}
      }
    } else {
      return {statusCode: 200, response: null, msg: 'Invalid credentials'}
    }
  } catch (error) {
    throw error;
  }
};

module.exports = { loginService };
