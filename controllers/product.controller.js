const ProductDTO = require("../dtos/product.dto");
const productService = require("../services/product.service");

class productController {
    async create(req, res, next) {
        try {
            let data = await productService.create(req.body);
            res.status(201).json({
                message: "Products created successfully",
                product: data,
            });
        } catch (err) {
            next(err);
        }
    }
    async delete(req, res, next) {
        try {
            let { id } = req.params;
            let data = await productService.delete(id);
            res.json({
                message: "Product deleted successfully",
                product: data,
            });
        } catch (err) {
            next(err);
        }
    }
    async getAll(req, res, next) {
        try {
            let data = await productService.getProducts();
            res.json(data);
        } catch (err) {
            next(err);
        }
    }
    async getOne(req, res, next) {
        try {
            let { id } = req.params;
            let data = await productService.getOne(id);
            let productDto = new ProductDTO(data);
            res.json(productDto);
        } catch (err) {
            next(err);
        }
    }
    async edit(req, res, next) {
        try {
            let { id } = req.params;
            let data = await productService.edit(id, req.body);
            let productDto = new ProductDTO(data);
            res.json({
                message: "Product edited successfully",
                product: productDto,
            });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new productController();
