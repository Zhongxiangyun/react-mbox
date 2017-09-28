项目需要的依赖

- 安装node----6.3
- 安装webpack
- 安装yarn
- 安装项目依赖  yarn install
- 编译项目   yarn run build 
- 启动项目服务 yarn run dev 
- 访问项目：http://localhost:3000/hostMain

-关于路由是否需要开启登陆后才能访问的操作，对应里面的

    `{
        path:'/cabinetMain',//机柜
        protected: 'no',//如果这里是yes的话则需要用户登陆才能访问
        component: CabinetMain
    },`
    
- 效果图展示

![效果图展示](http://owx1lr0th.bkt.clouddn.com/image/blog1.gif)
