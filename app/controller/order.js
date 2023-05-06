'use strict';

const { Controller } = require('egg');

const validOrderRule = {
  customerId: { type: 'string', required: true, min: 1, max: 20 },
  customerName: { type: 'string', required: true, min: 1, max: 20 },
  customerPhone: { type: 'number', required: true },
  sendDate: { type: 'string', required: false },
  proList: {
    type: 'array', required: true, itemType: 'object', rule: {
      date: { type: 'string', required: true },
      productName: { type: 'string', required: true, min: 1, max: 100 },
      address: { type: 'string', required: true },
      status: { type: 'number', required: true },
      num: { type: 'int', required: true },
      price: { type: 'number', required: true },
    },
  },
  totalMoneyChina: { type: 'number', required: true },
  rate: { type: 'number', required: true },
  totalMoneyJapan: { type: 'number', required: true },
  getDate: { type: 'string', required: false },
  getAddress: { type: 'string', required: true },
  status: { type: 'number', required: true },
};

class OrderController extends Controller {
  async index () {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }
  // 增加
  async addOrder () {
    const { ctx } = this;
    console.log('ctx.request.body:', ctx.request.body);
    try {
      ctx.validate(validOrderRule, ctx.request.body);
      await ctx.model.Order.create(ctx.request.body);
      ctx.body = {
        code: 0,
        msg: '新增成功',
      };

    } catch (error) {
      console.log('error:', error);
      ctx.body = {
        code: -1,
        msg: '参数不能为空或者参数格式错误',
      };
    }
  }

  async batchUpdateOrderStatus () {
    const { ctx } = this;
    try {
      const upStatusList = ctx.request.body.list;
      console.log('upStatusList:', upStatusList);
      if (!upStatusList || Array.isArray(upStatusList) === false || upStatusList.length === 0) {
        ctx.body = {
          code: -1,
          msg: '参数不能数为空',
        };
        return;
      }
      const upStatusFn = upStatusList.map(async item => {
        return await ctx.model.Order.findOneAndUpdate({
          _id: item._id,
        }, {
          $set: {
            status: item.status,
          },
        });
      });
      await Promise.all(upStatusFn).then(() => {
        ctx.body = {
          code: 0,
          msg: '更新成功',
        };

      }).catch(err => {
        ctx.body = {
          code: 0,
          msg: '更新失败',
          data: err,
        };
      });


    } catch (error) {
      ctx.body = {
        code: -1,
        msg: '参数格式不对',
        data: error,
      };
    }

  }


  async deleteOrder () {
    const { ctx } = this;
    const { _id } = ctx.request.body;

    if (_id !== null && _id !== undefined) {
      const res = await ctx.model.Order.deleteOne({ _id });
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
  async getOrder () {
    const { ctx } = this;
    const { sendDate } = ctx.query;
    const searchObj = {};
    if (sendDate) {
      searchObj.sendDate = sendDate;
    }
    const originData = await ctx.model.Order.find(searchObj).sort({ status: 1, sendDate: -1 });
    ctx.body = {
      code: 0,
      msg: '查询成功',
      data: {
        list: originData,
      },
    };
  }
}

module.exports = OrderController;

