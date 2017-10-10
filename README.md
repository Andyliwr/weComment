# weComment
简单易部署的评论系统

## 需要实现的功能
1. 适配H5和PC的评论界面
2. 多种登陆方式
3. 评论分页
4. 封装成一个js，只需要script引入即可使用
5. 评论后台管理界面

## 评论系统实现原理
![评论的数据结构](https://olpkwt43d.qnssl.com/weComment/%E8%AF%84%E8%AE%BA%E7%9A%84%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84.png)
![评论数据结构](https://olpkwt43d.qnssl.com/weComment/%E8%AF%84%E8%AE%BA%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84.png)
![评论树形表达](https://olpkwt43d.qnssl.com/weComment/%E8%AF%84%E8%AE%BA%E6%A0%91%E5%BD%A2%E8%A1%A8%E8%BE%BE.png)

## 界面UI
![ui](https://olpkwt43d.qnssl.com/weComment/%E8%AF%84%E8%AE%BA%E7%95%8C%E9%9D%A2.png)

## 项目目录
`client/`是前端代码，`server/`下是`koa`后端代码。

## 项目运行
1. 运行后端程序
```
# install dependencies:
cd server && npm install
# run the app:
SET DEBUG=koa* & npm start server
```

## 项目进度
1. 初始化项目 2017/10/10
2. ui设计 2017/10/10
3. 选择技术 koa+mongodb 2017/10/10
