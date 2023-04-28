'use strict';

const { Controller } = require('egg');

const validProRule = {
  date: { type: 'date', required: true },
  productName: { type: 'string', required: true },
  num: { type: 'int', required: true },
  price: { type: 'number', required: true },
  totalPrice: { type: 'number', required: true },
};

class ProductController extends Controller {
  async index () {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }
  // 增加
  async addProduct () {
    const { ctx } = this;
    try {
      ctx.validate(validProRule, ctx.request.body);
      const { date, productName, num, price, totalPrice } = ctx.request.body;
      const res = await ctx.model.Product.create({
        date,
        productName,
        num,
        price,
        totalPrice,
      });
      ctx.body = {
        code: 0,
        msg: '新增成功',
        data: res,
      };

    } catch (error) {
      ctx.body = {
        code: -1,
        msg: '参数不能为空',
      };
    }
  }

  async batchAddProduct () {
    const { ctx } = this;
    try {
      ctx.validate({
        list: { type: 'array', itemType: 'object', required: true, rule: validProRule },
      }, ctx.request.body);
      const res = await ctx.model.Product.create(ctx.request.body.list);
      ctx.body = {
        code: 0,
        msg: '批量新增成功',
        data: res,
      };
    } catch (error) {
      ctx.body = {
        code: -1,
        msg: '参数不能为空',
      };
    }
  }

  async deleteProduct () {
    const { ctx } = this;
    const id = ctx.request.body.id;
    if (id !== null || id !== undefined) {
      const res = await ctx.model.Product.deleteOne({ _id: id });
      // console.log('control res:', res);
      if (res.affectedRows === 1) {
        return {
          code: 0,
          msg: '删除成功',
        };
      }
      return {
        code: -1,
      };
    }

    ctx.body = {
      code: -1,
      msg: 'id不能为空',
    };
  }


  // 获取
  async getProduct () {
    const { ctx } = this;
    const { startDate, endDate, productName } = ctx.request.body;
    const searchObj = {};

    if (startDate && endDate) {
      searchObj.date = {
        $gte: startDate,
        $lte: endDate,
      };
    }
    if (productName) {
      searchObj.productName = {
        $regex: '.*' + productName + '.*',
      };
    }
    const data = await ctx.model.Product.findOne(searchObj);
    ctx.body = {
      code: 0,
      msg: '查询成功',
      data,
    };
  }
}

module.exports = ProductController;

