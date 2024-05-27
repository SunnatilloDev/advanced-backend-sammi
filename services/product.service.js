const ProductModel = require("../models/product.model");

class ProductService {
    async create(details) {
        const product = await ProductModel.create(details);
        return product;
    }
    async delete(id) {
        const product = await ProductModel.findByIdAndDelete(id);
        return product;
    }
    async getProducts() {
        return await ProductModel.find();
    }
    async getOne(id) {
        const product = await ProductModel.findById(id);
        return product;
    }
    async edit(id, details) {
        const product = await ProductModel.findByIdAndUpdate(id, details, {
            new: true,
        });
        return product;
    }
}

module.exports = new ProductService();
