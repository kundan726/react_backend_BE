const { ROLES } = require("../../constants/constants");
const {
  throwErrorForMissingFields,
} = require("../../utilities/utilities");
const { main } = require("../../utilities/utilities");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const signUpService = async (req, res) => {
  try {
    const { email, mobile,username,role, password } = req?.body;
    const receivedData = { email,username,role, mobile, password };
    await throwErrorForMissingFields(receivedData, [
      email,
      username,
      mobile,
      password,
      role
    ]);

    //Validating Role
    if(!Object.values(ROLES).includes(role)){
      return { statusCode: 400, response: null, msg: "Invalid role specified" };
    }
    
    const fetchParams = {
      action: "fetchOneUser",
      data: email,
    };
    const fetchResponse = await main(fetchParams);
    console.log("fetchResponse",fetchResponse)
    if(fetchResponse?.email == email){
      return { statusCode: 409, response: null, msg: "Email already exists" };
    }else{

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    receivedData.password = hashedPassword;
    const params = {
      action: "createUser",
      data: receivedData,
    };
    const response = await main(params);
    console.log("response in signUpService",response)
    // const token = jwt.sign({userId:response?._id, role: response?.role},process.env.JWT_SECRET_KEY, {'expiresIn': '1h'});
    // let responseToSend = {...response,token};
    return { statusCode: 201, response, msg: "User created successfully" };
    // return { statusCode: 201, responseToSend, msg: "User created successfully" };

  }
  } catch (error) {
    console.log("Error in signup service", error);
    throw error;
  }
};

module.exports = { signUpService };
