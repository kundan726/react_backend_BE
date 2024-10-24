const {
  addProductService,
  fetchProductService,
  listProductsService,
  editProductService,
  deleteProductService,
  listAllProduct
} = require("../../services/productServices/product.service");
const { buildResponse } = require("../../utilities/utilities");

const addProduct = async (req, res) => {
  try {
    const productData = {
      ...req?.body,
      imageURL: req?.file?.location,
    };
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
    const { _id } = req?.query;
    const fetchProductData = { _id };
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

const listSellerProductsController = async (req, res) => {
  try {
    const { userEmail } = req?.query;

    if (!userEmail) {
      return res
        .status(400)
        .json(buildResponse(400, null, "Email is required"));
    }

    const listProductData = { userEmail };
    const response = await listProductsService(listProductData);

    return res
      .status(200)
      .json(
        buildResponse(response?.statusCode, response?.response, response?.msg)
      );
  } catch (error) {
    console.error("Error inside listProductController", error);
    return res
      .status(400)
      .json(buildResponse(400, null, error?.message || "An error occurred"));
  }
};

const editProductController = async (req, res) => {
  try {
    console.log("req",req)
    const dataToBeEdited = req?.body
    const response = await editProductService(dataToBeEdited);
    return res.status(200).json(buildResponse(response?.statusCode, response?.response, response?.msg));
  } catch (error) {
    console.log("Error insode editProductController",error);
    return res.status(400).json(buildResponse(400, null, error?.message || "An Error Occurred"))
  }
}

const deleteProductController = async (req, res) => {
  try {
    const {id} = req?.query;
    const response = await deleteProductService(id);
    return res.status(200).json(buildResponse(
      response?.statusCode,
      response?.response,
      response?.msg
    ))
  } catch (error) {
    console.log("Error inside deleteProductController", error);
    return res.status(400).json(buildResponse(400, null,error?.message || "An Error Occurred"))
  }
}

const listProductController = async (req, res) => {
  try {
    const response = await listAllProduct();
    console.log("...........",response);
    return res.status(200).json(buildResponse(
      response?.statusCode,
      response?.response,
      response?.msg)
    )
  } catch (error) {
    console.log("Error inside listProductController", error);
    return res.status(400).json(buildResponse(400, null, error?.message || 'An Error Occurred'))
  }
}
module.exports = { addProduct, fetchProductController, listSellerProductsController , editProductController,deleteProductController, listProductController };
