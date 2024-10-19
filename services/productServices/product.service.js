const {main} = require('../../utilities/utilities');
const {throwErrorForMissingFields} = require('../../utilities/utilities');

const addProductService = async (productData) => {
    try {
        console.log('......',productData);
        const { productName, productPrice, productDescription, imageURL,userEmail } = productData
        // await throwErrorForMissingFields(productData,[productName, productPrice, productDescription, imageURL, userEmail])
        const params = {
            action: 'addProduct',
            data: productData,
        }
        const addProductQueryResponse = await main(params);
        return {
            statusCode: 201,
            response: addProductQueryResponse,
            msg: 'Product Created Successfully'
        }
    } catch (error) {
        console.log("Error in addProductService",error);
        throw error;
    }
};

const fetchProductService = async (obj) => {
    try {
        console.log("fetchProductService object",obj);
        // const { email, _id } = obj;
        const params = {
            action : 'fetchProduct',
            data : obj
        }
        const fetchProductServiceResponse = await main(params);
        return {
            statusCode: 200,
            response : fetchProductServiceResponse,
            msg : 'Product Fetched Successfuly'
        }
    } catch (error) {
        console.log("Error inside fetchProducts",error);
        throw error;
    }
}

const listProductsService = async (obj) => {
    try {
        console.log("Inside listproducts and its request obj",obj);
        const params = {
            action: 'listProducts',
            data : obj
        };
        const listProductsResponse = await main(params);
        return {
            statusCode: 200,
            response : listProductsResponse,
            msg: "Product list fetched successfully"
        }
    } catch (error) {
        console.log("Error inside listProducts",error);
        throw error;
    }
}
module.exports = { addProductService, fetchProductService,listProductsService }