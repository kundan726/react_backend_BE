const express = require("express");
const router = express.Router();
const {
  addProduct,
  fetchProductController,
  listProductController,
} = require("../../controller/productController/product.controller");
const upload = require("../../utilities/fileUpload");

router.post("/addProduct", upload.single("productImage"), addProduct);
router.get("/fetchProduct", fetchProductController);
router.get("/listProducts", listProductController);

module.exports = router;
