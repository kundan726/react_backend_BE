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
        const response = await productModel.find(params?.email);
        console.log("Response of listProducts", response);
        return response;
    } catch (error) {
       console.log("Error inside listProducts", error);
       throw error; 
    }
}

const editProduct = async(params) => {
    try {
        console.log("params",params);
        const {id, ...dataToStore} = params?.data;
        console.log("id, ...dataToStore",id, dataToStore)
        const response = await productModel.findOneAndUpdate({_id : params?.data?.id},dataToStore,{ returnDocument: 'after' });
        return response;
    } catch (error) {
        console.log("Error inside editProduct", error);
       throw error; 
    }
}

const deleteProduct = async (params) => {
    try {
        console.log("params",params);
        const response = await productModel.deleteOne({_id : params?.data});
        console.log("response",response);
        return response;
    } catch (error) {
        console.log("Error inside delete product", error);
        throw error;
    }
}

const listAllProducts = async (params) => {
try {
    const response = await productModel.find({});
    console.log("Response in listAllProducts",response);
    return response;
} catch (error) {
    console.log("Error inside listAllProducts",error);
    throw error;
}
}
module.exports = { addProduct,fetchProduct,listProducts, editProduct, deleteProduct, listAllProducts };