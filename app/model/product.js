'use strict';
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  // console.log('Schema:', Schema);
  const ProductSchema = new Schema({
    date: {
      type: String,
      required: true,
      index: true,
    },
    productName: {
      type: String,
      required: true,
    },
    num: {
      type: Number,
      required: true,
    },
    price: { // 区县
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: Number,
      required: true,
      default: 0,
    },
  });

  return mongoose.model('Product', ProductSchema);
};
