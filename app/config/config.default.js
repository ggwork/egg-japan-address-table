/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {
    mongoose: {
      url: 'mongodb://127.0.0.1:27017/community_address', //
      options: {
        useUnifiedTopology: true,
      },
    },
  };
  // 不起效果
  // config.cluster = {
  //   listen: {
  //     port: 8000, // 默认值是7001
  //   },
  // };


  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1653450119759_2977';

  // add your middleware config here
  config.middleware = ['spider'];


  // add your user config here
  const userConfig = {
    // 密码字符串
    passwordSalt: 'moyushop818',
    mapKey: '4f3ba438785e2466d16f1e6aceef893f', // 我的key
    // mapKey: '2edddd667b57bce083296791c6efe185', // 媳妇的key

    multipart: {
      mode: 'file',
      fieldNameSize: 100,
      fieldSize: '100kb',
      fields: 10,
      fileSize: '10mb',
      files: 1,
      fileExtensions: ['.xls', '.xlsx'],
    },
    security: {
      csrf: {
        enable: false,
      },
      domainWhiteList: ['http://localhost:3004', 'http://poi.moyutime.cn', 'https://poi.moyutime.cn'],
    },
    cors: {
      credentials: true,
      allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
    },
    jwt: {
      secret: '12332113288214456',
      expiresIn: '2h',
    },
  };

  return {
    ...config,
    ...userConfig,
  };
};
