# 内容管理平台开发

## 1. 项目运行

``` bash
//开启3001后端服务器
cd week08/homework/server
npm i
npm start

//启动前端页面
cd week08/homework/client
npm i
npm run build
```

打开 http://localhost:3001/index.html 查看项目效果

技术栈：` React:18`+`Antd:5.17.4` + `Redux` + `ReactRouter` + `Webpack`



## 2.代码结构

```path
client
	├── src
    ├── App.tsx # 路由配置
    ├── hooks
      ├── useTableHeight.ts
    ├── index.css
    ├── index.tsx # 项目入口文件
    ├── lang.config.ts # 国际化配置
    ├── pages
      ├── Data 
        ├── Component # data页面的组件包
          ├── ModalSet.tsx # 新增和编辑共用的弹出modal组件
          ├── SearchBar.tsx # 检索组件
        ├── tagsList.ts # tags下拉菜单数据
        ├── index.tsx # data主页面
      ├── Experience
        ├── index.tsx #学习心得主页面
      ├── Header
        ├── Header.module.css # Header样式
        ├── MyHeader.tsx # 页面Header
      ├── Tags
        ├── Component # Tags页面的组件包
          ├── ModalSet.tsx # 新增和编辑共用的弹出modal组件
        ├── index.tsx # Tags主页面
    ├── services # 总接口包
      ├── dataApi.ts # data请求接口
      ├── index.ts # 封装axios，设置拦截器
      ├── langApi.ts # 国际化请求接口
      ├── tagsApi.ts # tags请求接口
    ├── setupProxy.js # koa跨域配置
    ├── store
      ├── index.ts	导出lang.ts
    	├── modules
        ├── lang.ts # 国际化store

├── tsconfig.json 
├── .env # 防止被别人通过sourceMap追踪到源码 
├── README.md 
├── craco.config.js #craco配置把@识别为src
├── package-lock.json
├── package.json
```

### 2.1数据字段及功能

> data页面

| 序号 |    字段名     | 描述                       | 类型     | 页面是否显示，查询                        | 新增                     | 编辑           | 是否为主键 |
| ---- | :-----------: | -------------------------- | -------- | ----------------------------------------- | ------------------------ | -------------- | ---------- |
| 1    |     `uuid     | 唯一id号                   | string   | N                                         | 后端生成                 | -              | 是         |
| 2    |     `id`      | 数据序号,由前端生成        | int      | Y                                         | -                        | -              |            |
| 3    |    `name`     | 名称，点击复制             | string   | Y，可输入文字模糊查询，限制在20个字符以内 | 非空                     | 非空           |            |
| 4    | `description` | 描述，点击复制             | string   | Y，限制在50个字符以内                     | 非空                     | 非空           |            |
| 5    |  `add_time`   | 添加时间,ms,1712113176508  | string   | Y，可按时间前后查询，单位：s              | 根据当前时间自动生成，ms | -              |            |
| 6    |    `tags`     | 标签id，string[]，点击复制 | string[] | Y，下拉多选框筛选                         | 下拉多选框选择           | 下拉多选框选择 |            |



> page页面

| 序号 | 字段名 | 描述                         | 类型   | 页面是否显示 | 新增     | 编辑     | 删除，一键删除           | 是否为主键 |
| ---- | :----: | ---------------------------- | ------ | ------------ | -------- | -------- | ------------------------ | ---------- |
| 1    | `uuid` | 唯一id号,  与`data.tags`对应 | string | N            | 后端生成 | -        | 判断id是否已在data中使用 | 是         |
| 2    | `tags` | 标签名                       | string | Y            | 非空     | 非空     | -                        |            |
| 3    | `color`  | 标签颜色                     | string | N            | 下拉选择 | 下拉选择 | -                        |            |

## 3. 项目优化

### 3.1导入路径优化--`craco`

> - 把 @/ 解析为 src/



> 1. 项目根目录下创建配置文件`craco.config.js`

```ts
const path = require('path')

module.exports = {
  // webpack 配置
  webpack: {
    // 配置别名
    alias: {
      // 约定：使用 @ 表示 src 文件所在路径
      '@': path.resolve(__dirname, 'src')
    },
  },
}
```

> 2. tsconfig.json文件中添加

```ts
{
  "compilerOptions":{
    "baseUrl":"./",
      "paths":{
      "@/*":[
        "src/*"
      ]
    }
  }
}
```



### 3.2 路由懒加载

```ts
import { lazy } from "react";

const MyHeader = lazy(()=>import('@/pages/Header/MyHeader'))
const DataIndex = lazy(()=>import('@/pages/Data'))
const TagsIndex = lazy(()=>import('@/pages/Tags'))
const ExperienceIndex = lazy(()=>import('@/pages/Experience'))
```

### 3.3 性能优化

用memo来优化 对话框弹出层组件和检索组件 ，减少不必要的渲染

在根目录下建立`.env`文件， 防止被别人追踪到源码，加快打包速度（不生成sourceMap）

```.
GENERATE_SOURCEMAP=false
```

