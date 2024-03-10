const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');

mongoose.plugin(slug);

const Schema = mongoose.Schema;

const Product = new Schema(
  {
    categoryID: Number,
    name: String,
    description: String,
    code: String,
    price: Number,
    discount: Number,
    thumb: String,
    content: String,
    status: Number,
    quantity: Number,
  },
  { timestamps: true },
);

module.exports = mongoose.model('Product', Product);
