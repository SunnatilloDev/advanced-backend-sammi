class ProductDTO {
    name;
    description;
    category;
    brand;
    quantity;
    price;
    availability;
    images;
    sales;
    pricing;
    reviews;
    _id;
    createdAt;
    updatedAt;
    constructor(model) {
        this.name = model.name;
        this.description = model.description;
        this.category = model.category;
        this.brand = model.brand;
        this.quantity = model.quantity;
        this.price = model.price;
        this.availability = model.availability;
        this.images = model.images;
        this.sales = model.sales;
        this.pricing = model.pricing;
        this.reviews = model.reviews;
        this.id = model._id;
        this.createdAt = model.createdAt;
        this.updatedAt = model.updatedAt;
    }
}

module.exports = ProductDTO;
