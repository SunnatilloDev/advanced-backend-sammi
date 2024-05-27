const { Router } = require("express");
const productController = require("../controllers/product.controller");

let router = Router();

router.get("/", productController.getAll);
router.post("/", productController.create);
router.delete("/:id", productController.delete);
router.put("/:id", productController.edit);
router.get("/:id", productController.getOne);

module.exports = router;
