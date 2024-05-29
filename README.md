
## 内容管理平台开发

#### 1. 项目运行

``` bash
//开启3001服务器
cd week08/homework/server
npm i
npm run start
//启动开发者模式
cd week08/homework/client
npm i
npm run start
```



#### 2.代码结构

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
      ├── index.ts
├── tsconfig.json 
├── README.md 
├── craco.config.js #craco配置把@识别为src
├── package-lock.json
├── package.json
```



