const { createUser, fetchOneUser } = require("../queries/loginModule.queries");
const {addProduct, fetchProduct, listProducts, editProduct, deleteProduct, listAllProducts} = require('../queries/productQueries')
const main = async (params) => {
  try {
    const { action } = params;
    let response;
    switch (action) {
      case "createUser":
        response = await createUser(params);
        break;
      case "fetchOneUser":
        response = await fetchOneUser(params);
        break;
      case "editOneUser":
        response = await editOneUser(params);
        break;
      case "deleteOneUser":
        response = await deleteOneUser(params);
        break;
      case "addProduct":
        response = await addProduct(params);
        break;
      case "fetchProduct":
        response = await fetchProduct(params);
        break;
      case "listProducts":
        response = await listProducts(params);
        break;
      case "editProduct":
        response = await editProduct(params);
        break;
      case "deleteProduct":
        response = await deleteProduct(params);
        break;
      case "listAllProducts":
        response = await listAllProducts(params);
        break;
      default:
        throw new Error("Invalid action on DB");
    }
    return response;
  } catch (error) {
    console.log("Error inside main function", error);
    throw error;
    // await buildResponse(400, null, error?.message);
  }
};

const buildResponse = (statusCode, response, msg) => {
  try {
    return {
      statusCode,
      response,
      msg,
    };
  } catch (error) {
    console.log("Error in success response", error);
  }
};

const throwErrorForMissingFields = async (receivedData, requiredData) => {
  let missingKeys = [];
  const receivedDataKeys = Object.entries(receivedData);
  console.log("keys", receivedData, requiredData);
  receivedDataKeys.forEach(([key, value]) => {
    if (
      !requiredData.includes(value) ||
      value == undefined ||
      value == null ||
      value == ""
    ) {
      missingKeys.push(key);
    }
  });

  if (missingKeys.length > 0) {
    console.log("111111111");
    throw new Error(`Missing keys: ${missingKeys.join(",")}`);
  }
};

module.exports = { buildResponse, throwErrorForMissingFields, main };
