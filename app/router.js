'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);


  // 商品相关
  router.post('/addProduct', controller.product.addProduct);
  router.post('/batchAddProduct', controller.product.batchAddProduct);
  router.post('/deleteProduct', controller.product.deleteProduct);
  router.post('/updateProduct', controller.product.updateProduct);
  router.get('/getProduct', controller.product.getProduct);
  router.post('/batchUpdateProductStatus', controller.product.batchUpdateProductStatus);

  // 订单相关
  router.post('/addOrder', controller.order.addOrder);
  router.post('/deleteOrder', controller.order.deleteOrder);
  router.post('/batchUpdateOrderStatus', controller.order.batchUpdateOrderStatus);
  router.get('/getOrder', controller.order.getOrder);
};
