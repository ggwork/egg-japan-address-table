'use strict';
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  // console.log('Schema:', Schema);
  const OrderSchema = new Schema({
    customerId: {
      type: String,
      required: true,
    },
    customerName: {
      type: String,
      required: true,
    },
    customerPhone: {
      type: String,
      required: true,
    },
    sendDate: {
      type: String,
      required: false,
    },
    proList: {
      type: Array,
      required: true,
    },
    totalMoneyChina: {
      type: Number,
      required: false,
    },
    rate: {
      type: Number,
      required: false,
    },
    totalMoneyJapan: {
      type: Number,
      required: false,
    },
    getDate: {
      type: String,
      required: false,
    },
    getAddress: {
      type: String,
      required: true,
    },
    status: {
      type: Number,
      required: true,
      default: 0,
    },
  });
  return mongoose.model('Order', OrderSchema);
};
