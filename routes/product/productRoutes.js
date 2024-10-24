const express = require("express");
const router = express.Router();
const {
  addProduct,
  fetchProductController,
  listSellerProductsController,
  listProductController,
  editProductController,
  deleteProductController
} = require("../../controller/productController/product.controller");
const {upload, noImageMulter} = require("../../utilities/fileUpload");

router.post("/addProduct", upload.single("productImage"), addProduct);
router.get("/fetchProduct", fetchProductController);
router.get("/listSellerProducts", listSellerProductsController);
router.post("/editProduct",noImageMulter, editProductController);
router.post("/deleteProduct", deleteProductController);
router.get("/listProducts",listProductController);

module.exports = router;
