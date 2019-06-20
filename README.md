# Simple Web IDE: 简单的Web端IDE实现


## **项目地址**

[webIDE-frontend](https://github.com/HhhuYu/webIDE_frontend)

[webIDE-backend](https://github.com/HhhuYu/webIDE_backend)

[Terminal-backend](https://kongdz.com/kdz/terminal-backend)

## **运行**

需要预装mongodb与nodejs

```bash
# frontend
git clone git@github.com:HhhuYu/webIDE_frontend.git

# 解压

# 安装第三方包
npm install

# 启动
ng serve --open
http://localhost:4200/
```

```bash
# backend
git clone git@github.com:HhhuYu/webIDE_backend.git

# 解压

# 安装第三方包
npm install

# 启动
npm start
http://localhost:3000/
```


## **页面展示**

- 登录
  - ![](images/login.png)

- 注册
  - ![](images/register.png)

- 主页
  - ![](images/main.png)

- 简单管理员
  - ![](images/admin.png)

## **主要功能**

- 登录与注册
  - 使用mongoose操作mongodb，存储用户信息
    - ![](images/mongodb.png)
  - 使用jwt做用户鉴权
  - 这个功能放在一台服务器上 
  - 注册玩用户会自动建立用户目录
- 对用户内部文件增删改查
  - 用户可以操作他空间的所有文件。
- 伪shell交互
  - 使用websocket，命令行的实时交互。
- 文件内容编辑
  - 可以识别文件，提供不一样的语言环境。

## **接口规范**

#### AJAX接口(文件系统操作)
- URI: /ajax/filetree
  - @method: `post`
  - @param: { username: ***string*** }
  - @Response: [{ id: ***number***, name: ***string***, options: ***...***, children: [ ***...*** ] }, { ***...*** }]
> 说明:
>
> 返回格式为JSON数据, 包含根目录下的各项, 每项若为非空目录, 则包含一个非空的children成员。

- URI: /ajax/fsop
  - @method: `POST`
  - @param: { type: ***READ*** / ***SAVE*** / ***DELETE*** / ***MKDIR*** / ***MKUSERROOT*** / ***RMDIR*** / ***MOVE*** , data: ***string***, path: ***string***, newPath: ***string*** }
  - @Response: { status: ***OK*** / ***FAILED***, data: ***string***, reason: ***string*** }

> 说明:
>
> type可选值为 READ, SAVE, DELETE, MKDIR, MKUSERROOT, RMDIR, MOVE
>
> SAVE需要data字段, MKDIR/RMDIR需要path字段, MOVE需要path和newPath字段。
>
> 路径均以`/`开始。
>
> 请求数据封装成JSON格式发送。
>
> 返回值为JSON格式, 包含字段status。若status取值为FAILED, 还包含reason字段(具体原因)。
>
> 如果请求的type字段为READ, 若成功, 返回数据中还应包含data字段, 表示具体内容。

#### WebSocket接口(基于`Socket.IO`)
- 客户端数据格式:
  - `command`类型, 包含命令
- 服务端数据格式:
  - `response`类型, 包含命令的输出数据
  - `over`类型, 通知客户端一条命令执行完毕, 可以输入下一条命令, 并包含当前目录

### 如何编写命令?

每个命令是一个JavaScript模块, 必须导出cmdName(字符串)和exec(执行入口函数)。
exec函数有两个参数, args(字符串数组, 参数列表)和env(各种系统函数的封装)。
env中包含的主要函数有:
- env.createFile
- env.createDirectory
- env.deleteFile
- env.deleteDirectory
- env.moveFile
- env.copyFile
- env.write
- env.end
- env.writeToFile
- env.readFile
- ... ...

要使用系统功能, 必须调用env中的函数。（此部分参考了 Java Native Interface 的设计)

例如编写一个 cat 命令:

```javascript
module.exports.cmdName = "cat";
module.exports.exec = function(args, env) {
    if (args == null || args.length == 0) {
        env.write("No file specified.\n");
        env.end();
        return;
    }
    var s = env.readFile();
    if (s != null) {
        env.write(s);
        env.write("\n");
    } else {
        env.write("Error occured while reading the file.\n");
    }
    env.end();
}
```
 
#### 用户登录与editor接口

- URL: /users/authenticate
  - @method: `post`
  - @description: 鉴权
  - @param: 

    ```json
    { 
      "email": "shiro@js.com",
      "password": "E910DF8F..."
      }
    ```
  - @Response: 

    ```json
    {
      "role": "admin",
      "enable": true,
      "_id": "5d03c765a0df980ac0bc2661",
      "email": "shiro@js.com",
      "username": "shiro",
      "path": "shiro-file-path",
      "create_time": "2019-06-14T16:12:21.792Z",
      "update_time": "2019-06-14T16:12:21.792Z",
      "__v": 0,
      "token":eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZDAzYzc2NWEwZGY5ODBhYzBiYzI2NjEiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE1NjA5NTE5MTh9.HaC7I7nHSb8_nDKvlW9ZLoXPwrq5RbP7xxXVkYvm9Vw
    }
    ```

- URL: /users/
  - @method: `post`
  - @description: 注册
  - @param: 

    ```json
    {
      "email": "shiro@js.com",
      "username": "shiro",
      "password": "E910DF8F..."
    }
    ```
  - @Response: 

    ```json
    {
      "message": "success"
    }
    ```

- URL: /langes/
  - @method: `get`
  - @description: 语言支持
  - @param: 

    ```json
    {
      "email": "shiro@js.com",
      "username": "shiro",
      "password": "E910DF8F..."
    }
    ```
  - @Response: 

    ```json
    {"langs":[["java",[{"lang":"java","name":"Java","version":"JDK 9.0.1","index":"1"},{"lang":"java","name":"Java","version":"JDK 10.0.1","index":"2"}]],["c",[{"lang":"c","name":"c","version":"GCC 5.3.0","index":"0"},{"lang":"c","name":"c","version":"GCC 7.2.0","index":"2"},{"lang":"c","name":"c","version":"GCC 8.1.0","index":"3"}]],["nodejs",[{"lang":"nodejs","name":"NodeJS","version":"9.2.0","index":"1"}]],["python3",[{"lang":"python3","name":"Python 3","version":"3.6.5","index":"2"}]],["csharp",[{"lang":"csharp","name":"C#","version":"mono 5.10.1","index":"2"}]],["ruby",[{"lang":"ruby","name":"Ruby","version":"2.2.4","index":"0"}]],["php",[{"lang":"php","name":"PHP","version":"5.6.16","index":"0"},{"lang":"php","name":"PHP","version":"7.2.5","index":"2"}]]]}
    ```



- URL: /run/
  - @method: `post`
  - @description: jdoole api调用
  - @param: 

    ```json
    {
      "lang": "java",
      "version": "jdk 1.8.1",
      "program": "Hello world"
    }
    ```
  - @Response: 

    ```json
    {
      "runResult": "result"
    }
    ```
## **前端模块依赖**

- `@angualr/*`: 属于angular本身提供的一些运行包，介绍一些重要的包。
  - `router`: 路由
  - `http`: http 请求
  - `forms`: forms 表单
  - `compiler`: 编译
- `ace-builds`: editor 组件
- `bootstrap`: bootstrap css组件库
- `core-js`: JavaScript的模块化标准库
- `font-awesome`: 字体和CSS框架
- `lodash.isequal`: lodash 中的 isequal模块
- `ngx-tree-dnd`: 文件树 组件
- `rxjs`: 响应式模块
- `tslib`: TypeScript的运行时库
- `zone.js`: zone是在异步任务中持续存在的执行上下文。
- `ngx-socket-io`: angular端的`socket.io`

## **用户鉴权后端模块依赖**

- `express`: 后端服务器框架
- `lodash`: 一致性、模块化、高性能的 JavaScript 实用工具库
- `request`: 网页请求库
- `body-parser`: Node.js正文解析中间件。
- `colors`: 让console有颜色
- `cors`: 跨域访问中间件
- `express-jwt`: express jwt中间键
- `jsonwebtoken`: jwt的一种实现
- `mongoose`: mongodb 连接
- `ts-node`: typescript node
- `typescript`: 提供 typescript 实现
- `winston`: 日志实现


## **terminal后端模块依赖**

- `express`: 后端服务器框架
- `body-parser`: Node.js正文解析中间件。
- `cors`: 跨域访问中间件
- `socket.io`: websocket

## **自我评估表**

| 特性            | 优秀 | 良好 | 中等 |
| --------------- | ---- | ---- | ---- |
| 函数式编程      | ✓    |
| REST api        | ✓    |
| 响应式编程      |      | ✓    |
| session Storage | ✓    |
| webSocket       | ✓    |



## **项目参考**

[Create an online IDE with Angular 6 + NodeJS](https://medium.com/@ofir3322/create-an-online-ide-with-angular-6-nodejs-part-1-163a939a7929)

[angular-7-role-based-authorization-tutorial-with-example](https://jasonwatmore.com/post/2018/11/22/angular-7-role-based-authorization-tutorial-with-example)

[nodejs-role-based-authorization-tutorial-with-example-api](https://jasonwatmore.com/post/2018/11/28/nodejs-role-based-authorization-tutorial-with-example-api)

[Create a Real-Time App with Socket.IO, Angular, and Node.js](https://alligator.io/angular/socket-io/)


## **网站推荐**


[stackblitz](https://stackblitz.com/)


[glitch](https://glitch.com/)