# 购买云服务器注意点

> 一定要勾选，否则没有公网ip

![](https://front-end-files.oss-cn-shenzhen.aliyuncs.com/node%E5%AD%A6%E4%B9%A0/a0833112-5b58-4e99-9c9d-fa07b97c64f3.jpg)

重新设置密码

![](https://front-end-files.oss-cn-shenzhen.aliyuncs.com/node%E5%AD%A6%E4%B9%A0/96847c68-2bdf-4f3c-89cc-c3de89346dc0.jpg)

ssh方式连接云服务器：

```shell
ssh root@47.93.3.99
```

# 服务器端安装软件

## ubuntu删除某个软件

```shell
sudo apt-get remove --purge 软件名称  
sudo apt-get autoremove --purge 软件名称 
```

## 安装node

> 搜索“ubuntu”

![](https://front-end-files.oss-cn-shenzhen.aliyuncs.com/node%E5%AD%A6%E4%B9%A0/Snipaste_2024-08-14_16-44-17.png)

![](https://front-end-files.oss-cn-shenzhen.aliyuncs.com/node%E5%AD%A6%E4%B9%A0/6d9e08ff-9c40-49e8-8c9f-2600ba158307.png)

然后，根据敲命令

## 安装mongodb

> https://www.mongodb.com/docs/v7.0/tutorial/install-mongodb-on-ubuntu

![](https://front-end-files.oss-cn-shenzhen.aliyuncs.com/node%E5%AD%A6%E4%B9%A0/07ac5d19-faf4-4ba0-a892-26646bebf58c.png)

安装命令执行下来之后，运行：

```shell
mongosh
```

## 安装redis

> https://redis.io/docs/getting-started/installation/install-redis-on-linux

![](https://front-end-files.oss-cn-shenzhen.aliyuncs.com/node%E5%AD%A6%E4%B9%A0/bf081661-5d48-4370-9540-b0f40a111820.png)

之后在服务器中搭建一个http服务器接收客户端请求，然后用http服务器转发处理

# 保持ssh服务连接不断开的方法

## 服务器主动保持连接

```shell
vim /etc/ssh/sshd_config
```

添加如下两句：

```shell
ClientAliveInterval 120
ClientAliveCountMax 720
```

重启sshd服务

```shell
systemctl restart sshd
```

- 第一句意思是服务端每间隔120s会向客户端发送一个空数据包
- 第二句表示服务器最大会发送720次,120*720=24小时
- 24小时期间连接是不会断开的

# vim修改文件

1. 进入某个文件

```shell
vim /etc/httpd/httpd.conf
```

2. 查找待修改内容位置 ：
   1. shift+“：”，使文件变成可查询状态
   2. 输入 / +查询内容 （eg 查询Directory参数，即 /Directory）
3. 找到位置后修改：按键盘 i 键 即变成可编辑状态
4. 修改文件内容后退出：按ESC键
5. 保存修改：
   1. shift+“：”，使文件变成可查询状态
   2. 输入 wq！
6. 如果不保存修改，可：
   1. shift+“：”，使文件变成可查询状态
   2. 输入 q！

> vim查看文件：cat  xxx

# Nginx反向代理与负载均衡

## 什么是NGINX？

Nginx 是一款轻量级、高性能的 Web 服务器软件，主要用于托管网站和应用程序。它可以作为一个独立的 Web 服务器，也可以与其他服务器（如 Apache 或 Node.js）一起工作，为它们提供额外的功能。

## Nginx 的主要用途？

1. **网页服务器**：
   - 当你浏览一个网站时，Nginx 可以直接为你提供网站的内容，比如 HTML 页面、图片、视频等。
2. **反向代理**：
   - 想象一下，你的网站背后其实有多个服务器在工作。Nginx 就像一个前台接待员，它接收用户的请求，并决定将请求发送给哪个后端服务器处理。
   - 这样做的好处是用户不需要知道后端服务器的具体位置，而且可以轻松地添加或移除后端服务器，不会影响用户体验。
3. **负载均衡**：
   - 当用户请求网站时，Nginx 可以将请求分散到不同的服务器上处理，这样即使有大量用户同时访问，也能确保网站运行顺畅。
4. **缓存**：
   - 如果用户请求的是一个经常被访问的页面或文件，Nginx 可以将其保存在缓存中。当下一个用户请求相同内容时，Nginx 可以直接从缓存中提供，而不需要再次请求后端服务器，这加快了响应速度。
5. **安全性提升**：
   - Nginx 可以保护后端服务器免受攻击。例如，它可以限制来自特定 IP 的请求数量，防止恶意用户滥用资源。
6. **SSL/TLS 加密**：
   - 当用户与网站之间传输敏感信息时，Nginx 可以加密这些数据，确保信息的安全性。
7. **易于管理和配置**：
   - Nginx 的配置文件简单易懂，即使是初学者也能快速上手。此外，它还支持热更新，可以在不停机的情况下更改配置。

通过以上这些功能，Nginx 帮助提高了网站的性能、安全性和可用性。如果你正在运行一个网站或者应用程序，考虑使用 Nginx 会是一个很好的选择。

## Nginx的安装与使用

### 安装与配置文件

> 根据Nginx的官网进行安装

```shell
sudo apt install nginx
```

打印nginx的版本

```shell
nginx -v
```

Nginx的配置文件位置：/etc/nginx文件下，文件名是nginx.cof

**日志文件**（/var/log/nginx）

- access.log：每一次Nginx接到的请求所有日志的记录

- error.log：错误请求的日志

### 一些关于Nginx的命令

**查看nginx的网络端口**

> 所有http服务器都会占用80端口

```shell
sudo netstat -tupln | grep 80
```

**启动nginx服务**

```shell
# 方式一
sudo systemctl start nginx
# 方式二
nginx
```

**停止nginx服务**

> quit和stop的区别：quit是优雅停止，它会等到所有的子进程把请求处理完后再停止nginx服务，stop是立即停止

```shell
# 方式一
sudo systemctl stop nginx
# 方式二
nginx -s stop
# 方式三
nginx -s quit
```

**重启nginx服务**

```shell
sudo systemctl restart nginx
```

**查看nginx状态**

```shell
sudo systemctl status nginx
```

## nginx工作模型

![](https://front-end-files.oss-cn-shenzhen.aliyuncs.com/node%E5%AD%A6%E4%B9%A0/a5264433-b184-4245-a60b-9d99d0600dbd.jpg)

启动nginx之后，首先会开启master主进程，主进程主要是用来接收各个客户端发来的请求，然后进行工作分配（这些请求具体由谁<子进程>来处理）。它会开启多个子进程，这个请求由多个这样的子进程来完成处理。

改一下日志名：

```shell
# 将日志文件改名
mv access.log 22.log
# 创建一个新的access.log
touch access.log
```

会发现，即便是原来的access.log改了文件名，发请求还是会将日志写在原先的文件里面（22.log）。

原因：nginx记录日志不是根据文件名查找记录文件的，它是根据服务器开机时在磁盘的位置进行查看的，磁盘的位置是不变的。

怎么将access.log作为日志文件？

```shell
# 重新打开nginx
nginx -s reopen
```

如果我们改变了nginx配置文件之后，不希望服务停止，希望新的进程来了之后请求新的配置项

```shell
nginx -s reload
```

验证nginx语法的配置项（检查nginx配置文件的语法是否错误）

```shell
nginx -t
```

## nginx配置选项解析

nginx配置文件分为不同的区域：

1. Main区域：全局配置区，nginx核心功能配置
2. events区域：events事件区，子进程核心配置
3. http：服务器配置区
   1. server：不同服务配置区
      1. location：不同请求路径配置区，里面有具体的配置选项
4. main：邮件代理配置区
   1. server：邮件服务配置区，里面是具体配置选项

下面是nginx.conf配置文件：

```shell
vim nginx.conf
```

![](https://front-end-files.oss-cn-shenzhen.aliyuncs.com/node%E5%AD%A6%E4%B9%A0/7ab45c81-42e7-4221-ade4-8ccbcb4dc86d.jpg)

Main区域：

- user nginx：启动nginx后，用哪个系统下的账户启动的

- worker_process auto：允许开启的worker的数量，通常设置成和CPU数量相等，auto表示根据操作系统自动选择配置

- 启动nginx，每个服务都会占用一个pid

Events区域（事件区）：

- worker_connections：后面的值表示每一个worker进程支持的最大连接数，即一个worker进程同时可以处理1024个连接

## nginx反向代理

> 反向代理：客户端通过网关（nginx），访问内网服务器的内容

![](https://guiwanzhyq.oss-cn-hangzhou.aliyuncs.com/hc/img/20240810/0a07219e-762a-4865-8e01-0b798db6610d.jpg)

加下来写一段最基础的服务端代码：

> node-server.js

```javascript
var http = require('http')
var server = http.createServer()
server.listen(3005,()=>{
    console.log('服务器启动成功');
})
server.on('request',(req,res)=>{
    if(req.url == '/'){
        res.end('node-server')
    }else{
        res.end('other path node-server')
    }
})
```

### 如何把本地代码传到服务器

> 工具：https://www.filezilla.cn

![](https://front-end-files.oss-cn-shenzhen.aliyuncs.com/node%E5%AD%A6%E4%B9%A0/5c1ce516-f941-45c4-a8f5-4719c9ebd5cc.jpg)

> 主机：公网ip或者是域名
>
> 用户名：root
>
> 端口：22

![](https://front-end-files.oss-cn-shenzhen.aliyuncs.com/node%E5%AD%A6%E4%B9%A0/7196363c-0197-42e7-9fe5-0d14deaf4a7b.jpg)

### 在服务端运行并且客户端直接访问

由于这个软件只是用来推送文件到远程服务器，并不能运行文件，因此还需要命令行运行该文件。

```shell
cd
node node-server.js
```

这时候在客户端访问，比如公网ip是123.57.87.78，访问http://123.57.87.78:3005，就会访问不到。

解决方法：需要将3005端口加入到安全策略组

![](https://front-end-files.oss-cn-shenzhen.aliyuncs.com/node%E5%AD%A6%E4%B9%A0/c448dc6c-adcc-4158-9184-a8083dc9b0e2.jpg)

![](https://front-end-files.oss-cn-shenzhen.aliyuncs.com/node%E5%AD%A6%E4%B9%A0/45106d0e-7d3c-483e-8980-55dd4545219f.jpg)

### nginx代理

> 接下来要做的事情是，返回给客户端是node做过处理的结果。比如，通过http直接访问，我们访问http://123.57.87.78:3005。如果我们通过访问http://123.57.87.78:8080端口，也能返回给我们结果。

```shell
cd /etc/nginx/sites-enabled
vim default
```

然后注释掉404，添加如下代码：

![](https://front-end-files.oss-cn-shenzhen.aliyuncs.com/node%E5%AD%A6%E4%B9%A0/2497bcff-420a-4c3a-878e-11ef8b0334fb.jpg)

检查语法问题、重新加载：

```shell
nginx -t
nginx -s reload
```

**遇到的问题**

> 问题：nginx配置不生效 一直停在默认页面（welcom to nginx）

解决：

首先进入/etc/nginx目录，然后编辑nginx.conf

```shell
vim nginx.conf
```

然后添加下面两个代码，我的问题是没有引入sites-enabled文件

```
include  /etc/nginx/conf.d/*.conf;
include  /etc/nginx/sites-enabled/*''
```

# 项目部署与域名解析

> 项目部署之后，将本地的ip换成远程服务器的ip

域名购买，备案，然后解析。

![](https://front-end-files.oss-cn-shenzhen.aliyuncs.com/node%E5%AD%A6%E4%B9%A0/bec47881-9dfe-4620-96fc-36a3373f0ae1.jpg)

# 配置https安全协议

![](https://front-end-files.oss-cn-shenzhen.aliyuncs.com/node%E5%AD%A6%E4%B9%A0/de014c36-9a79-45c9-86a4-3700b277aceb%20%281%29.jpg)