const tagsService = require('../service/tag');
const dataService = require('../service/data');

/**
 * 新增标签接口处理函数
 * @param {object} ctx - Koa 上下文对象
 */
async function addTag(ctx) {
  try {
    const { name } = ctx.request.body;

    if (!name) {
      throw { status: 400, message: 'name不能为空' };
    }

    if (name.length > 10) {
      throw { status: 400, message: 'name长度不能超过10个字符' };
    }
    const tagList = await tagsService.getTags();
    const isNameExists = tagList.data.some(tag => tag.name === name);
    if (isNameExists) {
      // throw { status: 401, message: '标签名已存在' };
      ctx.body = {
        code: 401,
        msg: '标签名已存在'
      };
      return;
    }

    await tagsService.addTag(name);

    const responseData = {
      code: 201,
      msg: '添加成功',
    };

    ctx.body = responseData;
  } catch (error) {
    throw error;
  }
}

/**
 * 标签查询接口处理函数
 * @param {object} ctx - Koa 上下文对象
 */
async function getTags(ctx) {
  try {
    const { data = [] } = await tagsService.getTags();

    const responseData = {
      code: 200,
      msg: '查询成功',
      data,
    };

    ctx.body = responseData;
  } catch (error) {
    throw error;
  }
}

/**
 * 修改标签接口处理函数
 * @param {object} ctx - Koa 上下文对象
 */
async function editTag(ctx) {
  try {
    const { id, name } = ctx.request.body;

    if (!id) {
      throw { status: 400, message: 'id不能为空' };
    }

    if (!name) {
      throw { status: 400, message: 'name不能为空' };
    }

    await tagsService.editTag(id, name);

    const responseData = {
      code: 201,
      msg: '修改成功',
    };

    ctx.body = responseData;
  } catch (error) {
    throw error;
  }
}

/**
 * 删除标签接口处理函数
 * @param {object} ctx - Koa 上下文对象
 */
async function delTag(ctx) {
  try {
    // 获取 tags 参数
    let id = ctx.request.query['id'] || ctx.request.query['id[]'];
    // 如果 tags 是字符串，则将其转换为数组
    if (typeof id === 'string') {
      id = [id];
    }
    if (!id) {
      throw { status: 400, message: 'id不能为空' };
    }

    const { data } = await dataService.getData();
    const isThisIdWasUsed = id.every(id => data.some(item => item.tags.includes(id)));

    if (isThisIdWasUsed) {
      ctx.body = {
        code: 401,
        msg: '该标签已被使用，不能删除'
      };
      return;
    }

    const result = await tagsService.delTag(id);

    const responseData = {
      code: 204,
      msg: '删除成功',
      data: result,
    };

    ctx.body = responseData;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  addTag,
  getTags,
  editTag,
  delTag,
};
