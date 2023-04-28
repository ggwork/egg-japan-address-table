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
  router.get('/getProduct', controller.product.getProduct);
};
