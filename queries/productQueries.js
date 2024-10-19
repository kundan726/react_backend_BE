const productModel = require('../models/productModel');
const main = require('../utilities/utilities');
const addProduct = async (params) => {
    try {
        const addDataResponse = await productModel.create(params?.data);
        console.log("addDataREsponse",addDataResponse);
        return addDataResponse;
    } catch (error) {
        console.log("Error inside addProduct",error );
        throw error;
    }
};

const fetchProduct = async (params) => {
    try {
        console.log("Params inside fetchOneProduct",params);
        const response = await productModel.findOne(params?.data);
        return response
    } catch (error) {
        console.log("Error inside fetchOneProduct",error);
        throw error;
    }
};

const listProducts = async (params) => {
    try {
        const response = await productModel.find(params?.data);
        console.log("Response of listProducts", response);
        return response;
    } catch (error) {
       console.log("Error inside listProducts", error);
       throw error; 
    }
}

module.exports = { addProduct,fetchProduct,listProducts };