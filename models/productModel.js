const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    productPrice: {
      type: String,
      required: true,
    },
    productDescription: {
      type: String,
      required: true,
    },
    imageURL: {
      type: String,
      required: true,
    },
    userEmail: {
      type: String,
      required: true,
    },
    //
    productSKU: {
      type: String,
      // required:  true
    },
    productBrand: {
      type: String,
      // required:  true
    },
    productWeight: {
      type: String,
      // required:  true
    },
    productDimensions: {
      type: String,
      // required:  true
    },
    productColorVariations: {
      type: String,
      // required:  true
    },
    productCategory: {
      type: String,
      // required:  true
    },
    productTags: {
      type: String,
      // required:  true
    },
    productShippingInfo: {
      type: String,
      // required:  true
    },
    productStockStatus: {
      type: String,
      // required:  true
    },
    productDiscount: {
      type: String,
      // required:  true
    },
    productAdditionalImages: {
      type: String,
      // required:  true
    },
    productInstructions: {
      type: String,
      // required:  true
    },
    productInstructions: {
      type: String,
      // required:  true
    },
    productReturnPolicy: {
      type: String,
      // required:  true
    },
    productWarranty: {
      type: String,
      // required:  true
    },
    productDateAdded: {
      type: String,
      // required:  true
    },
    productStatus: {
      type: String,
      // required:  true
    },
    productSEOTitle: {
      type: String,
      // required:  true
    },
    productSEODescription: {
      type: String,
      // required:  true
    },
    productSEOKeywords: {
      type: String,
      // required:  true
    },
  },
  { timestamps: true }
);

const productModel = mongoose.model('productModel',productSchema);
module.exports = productModel;