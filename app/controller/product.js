'use strict';

const { Controller } = require('egg');

const validProRule = {
  date: { type: 'date', required: true },
  productName: { type: 'string', required: true, min: 1, max: 100 },
  address: { type: 'string', required: true },
  status: { type: 'number', required: true },
  num: { type: 'int', required: true },
  price: { type: 'number', required: true },
  totalPrice: { type: 'number', required: false },
};

const validProRuleNotRequired = {
  _id: { type: 'string', required: true },
  date: { type: 'date', required: false },
  productName: { type: 'string', required: false, min: 1, max: 100 },
  address: { type: 'string', required: false },
  status: { type: 'number', required: false },
  num: { type: 'int', required: false },
  price: { type: 'number', required: false },
  totalPrice: { type: 'number', required: false },
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
      let { date, productName, address, status, num, price, totalPrice } = ctx.request.body;
      if (!totalPrice) {
        totalPrice = num * price;
      }
      await ctx.model.Product.create({
        date,
        productName,
        address,
        status,
        num,
        price,
        totalPrice,
      });
      ctx.body = {
        code: 0,
        msg: '新增成功',
      };

    } catch (error) {
      console.log('error:', error);
      ctx.body = {
        code: -1,
        msg: '参数不能为空',
      };
    }
  }
  // 更新
  async updateProduct () {
    const { ctx } = this;
    try {
      ctx.validate(validProRuleNotRequired, ctx.request.body);


      await ctx.model.Product.findOneAndUpdate({
        _id: ctx.request.body._id,
      }, {
        $set: {
          ...ctx.request.body,
        },
      });
      ctx.body = {
        code: 0,
        msg: '更新成功',
      };
    } catch (error) {
      ctx.body = {
        code: -1,
        msg: '参数格式不对',
        data: error,
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
        data: error,
      };
    }
  }

  async deleteProduct () {
    const { ctx } = this;
    console.log('ctx.request.body:', ctx.request.body);
    const { _id } = ctx.request.body;

    if (_id !== null && _id !== undefined) {
      const res = await ctx.model.Product.deleteOne({ _id });
      console.log('control res:', res);
      if (res.deletedCount === 1) {

        ctx.body = {
          code: 0,
          msg: '删除成功',
        };
      } else {
        ctx.body = {
          code: -1,
          msg: '删除失败',
        };
      }
    } else {
      ctx.body = {
        code: -1,
        msg: 'id不能为空',
      };
    }

  }


  // 获取
  async getProduct () {
    const { ctx } = this;
    let { startDate, endDate, address, cPage, pageSize = 20 } = ctx.query;
    if (!/[1-9]+/.test(cPage) || !/[1-9]+/.test(pageSize)) {
      ctx.body = {
        code: -1,
        data: [],
        msg: '页码必须是大于0数字',
      };
      ctx.status = 400;
      return;
    }
    cPage = Number(cPage);
    pageSize = Number(pageSize);
    const skipNum = (cPage - 1) * pageSize;
    const searchObj = {};
    if (startDate && endDate) {
      searchObj.date = {
        $gte: startDate,
        $lte: endDate,
      };
    }
    if (address) {
      // searchObj.address = {
      //   $regex: '.*' + address + '.*',
      // };
      searchObj.address = address;
    }
    const originData = await ctx.model.Product.find(searchObj).sort({ date: -1, status: 1 });
    const totalNum = originData.length;
    const list = originData.slice(skipNum, skipNum + pageSize);
    ctx.body = {
      code: 0,
      msg: '查询成功',
      data: {
        totalNum,
        list,
      },
    };
  }
}

module.exports = ProductController;

