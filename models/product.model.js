const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        brand: {
            type: String,
            required: true,
        },
        quantity: {
            type: String,
            required: true,
        },
        price: {
            type: Number || String,
            required: true,
        },
        availability: {
            type: Boolean,
            default: true,
        },
        images: [String],
        sales: {
            type: Number || String,
            default: 0,
        },
        pricing: {
            salePrice: Number || String,
            discount: {
                type: Number || String,
                default: 0,
            },
        },
        reviews: [
            {
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User",
                },
                rating: {
                    type: Number,
                    min: 1,
                    max: 5,
                },
                comment: String,
                date: {
                    type: Date,
                    default: Date.now,
                },
            },
        ],
    },
    { timestamps: true }
);

const ProductModel = mongoose.model("Product", productSchema);

module.exports = ProductModel;
