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


## mongo在window下的安装
1. 下载mongo
[官方网站下载地址])(https://www.mongodb.com/download-center?jmp=nav#community)
[百度云盘 ])(https://pan.baidu.com/s/1eSaTAb4) 提取密码：`a9ca`
2. 新建`data`和`log`文件夹
在安装的根目录下使用`cmd`执行以下命令
```
mkdir data
cd data && mkdir db
mkdir log
cd log
type nul>mongo.log
```
3. 将mongo设置为系统服务
以管理员身份运行`cmd`，并执行以下命令：
```
mongod.exe --bind_ip localhost --logpath "D:\mongo\log\mongo.log" --logappend --dbpath "D:\mongo\data\db" --port 27017 --auth --serviceName "mongodb" --serviceDisplayName "mongodb" --install
```
然后使用小娜搜索“服务”，在本地服务列表中找到刚才新建的服务`“mongo”`, 右击点击“启动”就好了。最后在cmd中输入`mongo`就能进入`mongo`命令行模式了（注意如果mongo没有设置系统环境变量，请自行添加，或者每次切换到mongo的执行目录---`D:\mongo\bin`执行命令）。
4. 创建数据库以及所需的表
在mongo命令行中执行以下命令
```
use wecomment
db.test.insert({"name": "xxx"})
# 查看刚才常见的数据库
show dbs
# 创建数据库的用户

```
use wecomment
db.createUser({
"user": "admin",
"pwd": "123456",
"roles": [{role: "readWrite", db: "wecomment"}]
})
# 使用auth命令来检测用户是否添加成功，返回1表示添加成功
db.auth("admin", "123456")
```
## 常见问题
1. 在安装完`mongo`启动koa项目的时候报`Authentication failed`错误

这是由于`mongodb`加入了`SCRAM-SHA-1`的校验方式，需要第三方工具配合进行验证。修复的方法如下：
+ 关闭刚才创建的`mongodb`的系统服务，在cmd下使用`mongodb.exe`启动`mongo`
```
cd D:\mongo\bin
mongodb.exe --dbpath D:\mongo\data\db --logpath D:\mongo\log\mongo.log
```
注意这里不要加上`--auth`参数，因为接下来的操作必须在关闭认证的情况下进行。
```
# 进入mongo命令行
mongo.exe
# mongo shell命令
use admin
var schema = db.system.version.findOne({"_id" : "authSchema"})
schema.currentVersion = 3
db.system.version.save(schema)
```
现在已经成功将`system.version`文档里面的`authSchema`版本修改为3。接下来删除原来创建的用户并重建它们

```
use admin
db.system.user.find()
db.system.user.remove({user: "admin"})

# 关闭之前开启的未认证的mongo进程，重启系统mongodb进程

use

```