const {
  addProductService,
  fetchProductService,
  listProductsService,
} = require("../../services/productServices/product.service");
const { buildResponse } = require("../../utilities/utilities");

const addProduct = async (req, res) => {
  try {
    const { productName, productPrice, productDescription, userEmail } =
      req?.body;
    console.log("req...................", req);
    const imageURL = req?.file?.location;
    // const productData = {
    //   productName,
    //   productPrice,
    //   productDescription,
    //   imageURL,
    //   userEmail,
    // };
    let productData = req?.body;
    productData = {...productData,imageURL}
    console.log("productData", productData);
    const response = await addProductService(productData);
    return res
      .status(response?.statusCode)
      .json(
        buildResponse(response?.statusCode, response?.response, response?.msg)
      );
  } catch (error) {
    console.log("Error inside addProduct", error);
    return res.status(400).json(buildResponse(400, null, error?.msg));
  }
};

const fetchProductController = async (req, res) => {
  try {
    const { _id, email } = req?.body;
    const fetchProductData = { _id, email };
    const response = await fetchProductService(fetchProductData);
    return res
      .status(200)
      .json(
        buildResponse(response?.statusCode, response?.response, response?.msg)
      );
  } catch (error) {
    console.log("Error inside fetchController", error);
    return res.status(400).json(buildResponse(400, null, error?.msg));
  }
};

const listProductController = async (req, res) => {
  try {
    const { email } = req?.body;
    const listProductData = { email };
    const response = await listProductsService(listProductData);
    return res
      .send(200)
      .json(
        buildResponse(response?.statusCode, response?.response, response?.msg)
      );
  } catch (error) {
    console.log("Error inside listProductController", error);
    return res.status(400).json(buildResponse(400, null, error?.msg));
  }
};
module.exports = { addProduct, fetchProductController, listProductController };
