# Redis概述

Redis是一种基于内存、开源的键值对（Key-Value）存储数据库，通常被用作数据库、缓存和消息代理。它使用ANSI C编写，支持多种数据结构，如字符串（String）、哈希（Hash）、列表（List）、集合（Set）和有序集合（Sorted Set），以及原子性操作和数据持久化功能。

Redis最初是为了解决关系型数据库在高访问量和高并发环境下的性能瓶颈而设计的。随着互联网应用的发展，对低延迟读写速度、海量数据流量支持、大规模集群管理及运营成本降低等方面的需求日益增加，NoSQL数据库应运而生。Redis因其高性能、可扩展性和易用性等特点，成为最受欢迎的NoSQL数据库之一。

此外，Redis还具有一些独特的特性，如发布订阅模式（Pub/Sub）、事务支持、Lua脚本执行等。这些功能扩展了Redis的应用范围，使其不仅可以作为高效的键值存储，还可以用于实现消息队列、分布式锁等复杂功能。

redis的特点：

1. 针对每一个键设置生存时间，生存时间到了之后，自动被删除
2. 限定数据的最大空间，数据达到空间限制后自动淘汰一些不需要的数据
3. 还可以实现队列系统，还容易实现优先级队列

redis的应用场景：

1. 缓存系统
2. 计数器
3. 分布式会话，在集群模式下，分布不多的情况一般会使用session自带的功能就能满足。如果应用比较多，而且相对复杂的情况，一般都会搭建redis数据库，作为中心的数据服务，session不再由容器进行管理，而是由session服务、内存数据库（即redis）进行管理。

# Redis的安装

- 版本号：版本号的第二位如果是奇数，就是非稳定版，反之，则是稳定版。
- 官方网站：https://redis.io
- 参考文档：https://zhuanlan.zhihu.com/p/472045476#:~:text=Window%E4%B8%8BRedis%E7%9A%84%E5%AE%89%E8%A3%85%E5%92%8C%E9%83%A8%E7%BD%B2%E8%AF%A6%E7%BB%86%E6%95%99%E7%A8%8B%201%20Redis%E4%B8%8B%E8%BD%BD%E2%80%8D%E5%9C%B0%E5%9D%80%EF%BC%9A%202%20%E4%B8%80%E3%80%81zip%E5%8E%8B%E7%BC%A9%E5%8C%85%E6%96%B9%E5%BC%8F%E4%B8%8B%E8%BD%BD%E5%AE%89%E8%A3%85%201%E3%80%81%E4%B8%8B%E8%BD%BDRedis%E5%8E%8B%E7%BC%A9%E5%8C%85%202%E3%80%81%E8%A7%A3%E5%8E%8B%E5%88%B0%E6%96%87%E4%BB%B6%E5%A4%B9%203%E3%80%81%E5%90%AF%E5%8A%A8Redis%E6%9C%8D%E5%8A%A1,5%E3%80%81%E6%B5%8B%E8%AF%95%E8%83%BD%E5%90%A6%E6%AD%A3%E5%B8%B8%E5%B7%A5%E4%BD%9C%204%20%E4%B8%89%E3%80%81%E4%BD%BF%E7%94%A8%E5%8F%AF%E8%A7%86%E5%8C%96%E5%B7%A5%E5%85%B7%201%E3%80%81Redis%20Desktop%20Manager%202%E3%80%81RedisStudio%203%E3%80%81treeNMS

![](https://front-end-files.oss-cn-shenzhen.aliyuncs.com/node%E5%AD%A6%E4%B9%A0/c71b29c1-b13a-4edd-852e-8cfcf728fec3.png)

> 可以在Linux、macOS安装，Windows下是不支持的。但是，在Windows下，memurai可以作为Redis的替代品。

**windows系统下运行Redis**

安装一个压缩包（阿里云盘里面）放到D盘

> 注意：Windows 安装包是某位民间“大神”根据 Redis 源码改造的，并非 Redis 官方网站提供。

> 这个打开之后不要关，这是redis服务端

```shell
redis-server.exe redis.windows.conf
```

配置环境变量：

> 将redis路径加入环境变量，这样就不用输入后面的（redis.windows.conf）了

![](https://front-end-files.oss-cn-shenzhen.aliyuncs.com/node%E5%AD%A6%E4%B9%A0/87d3965d-b26a-439d-8611-735f784d1a20.jpg)

设置密码：找到redis.windows.conf，搜索requirepass就可以设置密码。

切换到redis 目录下运行：

```shell
redis-cli.exe -h 127.0.0.1 -p 6379
```

# redis常规命令介绍

- redis-benchmark ： 用来测试redis性能
- redis-check-rdb 和 redis-check-aof ： 用来做持久化存储
- redis-server ： redis服务器指令
- redis-cli ： 连接到本地的redis服务

# memurai

> 官方地址：https://www.memurai.com

![](https://guiwanzhyq.oss-cn-hangzhou.aliyuncs.com/hc/img/20240810/61a8200c-e9fe-4900-96c0-c53b2d44af14.png)

## 启动

> 按下Win + R组合键打开运行窗口，输入services.msc并点击确定。在服务管理窗口中，找到Memurai服务并右键点击，选择启动。

![](https://front-end-files.oss-cn-shenzhen.aliyuncs.com/node%E5%AD%A6%E4%B9%A0/10b47064-86e0-4205-accc-769408dc9bba.png)

然后通过memurai-cli命令进入memurai的命令行界面。

## 设置密码

1. 找到memurai.conf
2. 找到 requirepass 这一行，设置个密码就行了

命令行的方式设置密码：

```shell
CONFIG SET requirepass fuck
```

客户端链接：

```shell
memurai-cli -h 127.0.0.1 -p 6379 -a yourpassword
```

断开方式：

```shell
# 方式一
ctrl + c

# 方式二
quit
```

# Redis客户端与多数据库

> 这里使用Memurai

## 客户端

查看服务器状态：

```shell
info server
```

![](https://front-end-files.oss-cn-shenzhen.aliyuncs.com/node%E5%AD%A6%E4%B9%A0/a41003cc-c047-407e-a53c-85b351ea1822.png)

说明：

- 第一行：redis脚本运行文件的位置

- 第二行：redis配置文件的位置

## redis数据库

redis默认有16个数据库，数据库的名字默认是0到15。不同的数据库之间的数据是隔离的。

存储数据：

> 在数据库中存储key为s1，value为1的键值对
>
> 不切换数据库的情况下，默认存储在0号数据库

```shell
set s1 1
```

查看当前的数据库中所有的名字（key值）：

```shell
keys *
```

查看当前数据库的某个key对应的value：

> 查看当前数据库s1下面的value

```shell
get s1
```

切换数据库：

> 切换到5号数据库

```shell
select 5
```

把0号数据库的s1移动到12号数据库：

> 首先需要切换到0号数据库，然后再移动

```shell
select 0
move s1 12
```

清空所有数据库的所有数据：

```shell
FLUSHALL
```

# Redis常用数据类型以及键名

常用的五个类型：

![](https://front-end-files.oss-cn-shenzhen.aliyuncs.com/node%E5%AD%A6%E4%B9%A0/a7756e4b-7644-4609-95d0-054b80a2a4d8.jpg)

键名：我们可以使用任何二进制序列作为key，例如字符串、jpg文件等、空字符串也是可以的。

# Redis数据类型相关的操作指令

> redis民间的中文教程手册：https://redis.com.cn，收集了redis操作的所有指令

> Redis指令默认是大写的，约定的东西，小写的效果也是一样的

```shell
# 清空redis所有的键
FLUSHDB
# 查看键的类型
TYPE S1
# 删除s1
DEL s1
# 将“S4”的键名换成“S1”
RENAME S4 S1
```

## 字符串

```shell
# 设置一个值
SET a 123
# 设置多个值
MSET A1 123 B1 456
# 将某个key设置为value，并且返回设置之前的值
GETSET s1 66
# 获取多个键对应的值
MGET s1 s2 s3
# 获取某个键的长度
STRLEN s1
# 获取某个值的数据类型
type s1
# 删除（可以删除一个或者多个）
del s2 s3
```

## 哈希

```shell
# 设置
HSET hash h1 1 h2 2 h3 3
# 查询keys
HKEYS hash
# 获取长度
HLEN hash
# 获取哈希值
HGET hash h2
# 获取多个哈希值
HMGET hash h2 h3
# 获取整个数据库的字段以及字段对应的值
HGETALL hash
# 修改哈希值
HSET hash h2 66
# 删除
HDEL hash h2
```

## 列表操作

> 列表是什么？
>
> 列表类似于数组，可以存储有序的字符串列表，常见操作是向列表的两端添加元素，或者获取列表的某个片段等

```shell
# 创建列表（l1列表）
LPUSH l1 66 88 99
# 获取列表的某个片段（后面两个是开始的位置、结束的位置）
LRANGE l1 1 3
# 向列表插入元素（向88前面插入元素）
LINSERT l1 before 88 44
# 向列表插入元素（向88后面插入元素）
LINSERT l1 after 88 44
# 获取具体位置的值
LINDEX l1 0
# 获取列表的长度
LLEN l1
# 删除列表元素（移除并且获取列表第一个元素）
LPOP l1
# 删除列表元素（删除最后一个元素）
RPOP l1
```

## 集合操作

> 集合的特点：集合中的元素是唯一的，而且是没有顺序的

```shell
# 创建集合s1（从第二个元素开始，都是集合成员）
SADD s1 11 22 33
# 获取集合中所有元素
SMEMBERS s1
# 获取集合中成员个数
SCARD s1
# 在集合中随机获取一个成员
SRANDMEMBER s1
# 在集合中随机获取多个成员（2个）
SRANDMEMBER s1 2
# 删除集合中的某一个或者多个数据（删除数据11）
SREM s1 11
# 随机删除（后面可以指定个数，默认是1个）
SPOP s1
```

## 有序集合的操作

> 什么是有序集合？
>
> 有序集合是集合和哈希之间的混合的数据类型，有顺序的哈希类型

```shell
# 创建有序集合
ZADD z1 5 u1 6 u2 66 u3 44 u4 55
# 由于是有序的，因此可以通过索引号拿到一定范围内的键名（由低到高排序）
ZRANGE z1 3 299
# 获取一定范围内的键名和键值
ZRANGE z1 3 299 withscores
# 拿到一定范围的键名（由高到低）
ZREVRANGE z1 0 99
# 获取某个元素的排名（也就是从小到大的顺序下的索引值）
ZRANK z1 u2
# 获取某个元素的排名（也就是从大到小的顺序下的索引值）
ZREVRANK z1 u4
# 获取整个有序集合所有成员个数
ZCARD z1
# 在原来基础上增加指定的增量（将u2在原来的基础上增加1）
zincrby z1 1 u2
# 删除有序集合中的某个值
ZERM z1 u2
```

# 使用node操作redis

> 官方推荐的是node-redis，muke使用的是ioredis

## 基本操作

```javascript
const Redis = require('ioredis')
const redis = new Redis({
    password:'fuck'
})
// 设置和获取值
redis.set('mykey','66666666')
redis.get('mykey',(err,result)=>{
    if(err){
        console.log(err);
    }else{
        console.log(result);
    }
})
// 获取当前数据库所有的键名
redis.keys('*').then(res=>{
    console.log(res);
})
```

输出结果：

![](https://front-end-files.oss-cn-shenzhen.aliyuncs.com/node%E5%AD%A6%E4%B9%A0/a3e2798b-125d-4b2b-8afd-2feeefb8b780.jpg)

## 热度排名案例

> zscore，判断某个键名是否存在于有序集合中

```javascript
const Redis = require('ioredis')
const redis = new Redis({
    password:'fuck'
})

// 获取一个30以内随机整数
let num = Math.round(Math.random()*30+1)
// 随机的字符串
let str = 'sdfsdafsdafl'
// 字符串的下标
let strtap = Math.round(Math.random()*11+0)
async function jihe(){
    // 获取分数值，如果没有，返回false
    /**
     * 参数一：有序集合的名字
     * 参数二：传入的键名
    */
    let isEixt = await redis.zscore('hots',str[strtap])
    if(isEixt){
        // 如果有这个键名，键值就给他加一
        await redis.zincrby('hots',1,str[strtap])
        console.log('加一');
    }else{
        // 如果没有这个键名，就创建这个键名
        const write = await redis.zadd('hots',num,str[strtap])
        console.log('写入',str[strtap]+write);
    }
    let collections = await redis.zrange('hots',0,400,'withscores')
    let obj = {}
    for(let i = 0;i<collections.length;i++){
        if(i%2==0){
            obj[collections[i]] = collections[i+1]
        }
    }
    console.log(obj);
}
jihe()
```

# 视频收藏

## 添加数据模型

> model/collectionModel.js

```javascript
const mongoose = require("mongoose")
const baseModel = require('./baseModel')

const collectVideoSchema = new mongoose.Schema({
    // 收藏哪个视频
    video:{
        type:mongoose.ObjectId,
        required:true,
        ref:"Video"
    },
    // 哪个用户收藏的
    user:{
        type:mongoose.ObjectId,
        required:true,
        ref:"User"
    },
    ...baseModel
})
module.exports = collectVideoSchema
```

## 创建路由

> router/video.js

```javascript
router.get('/collectionVideo/:videoId',verfyToken(),vidoController.collectionVideo)//获取喜欢视频的列表
```

## 业务逻辑

> controller/videoController.js

```javascript
// 收藏
exports.collectionVideo = async(req,res)=>{
    let userId = req.userInfo._id
    let {videoId} = req.params
    let video
    try {
        video = await Video.findById(videoId)
        if(!video){
            return res.status(500).json({err:'视频不存在'})
        }
    } catch (error) {
        return res.status(500).json({err:'视频不存在'})
    }
    let doc = await Collectvideo.findOne({
        user:userId,
        video:videoId
    })
    if(doc){
        return res.status(200).json({msg:'您已收藏该视频'})
    }
    let mycollect = await new Collectvideo({
        user:userId,
        video:videoId
    }).save()
    res.status(200).json({mycollect})
}
```

# 实现视频热度推荐机制

> 业务场景：用户单单观看了视频，热度加1。如果点赞了，热度加2。如果评论了视频，视频热度加2。如果收藏，热度加3。

## 前期准备工作

1. 在model文件夹下面创建一个redis文件夹，redis文件夹里面有index.js，用来连接redis
2. 安装ioredis
3. 在redis文件里面创建一个redishotsinc.js文件

## 收藏增加热度

### 连接redis

> model/redis/index.js

```javascript
/**
 * 连接redis
 */
const Redis = require('ioredis')
const redis = new Redis({password:'fuck'})

// redis成功/失败情况下，给出客户端提示信息
redis.on('error',(err)=>{
    if(err){
        console.log('redis连接错误',err);
        redis.quit()
    }
})
redis.on('ready',()=>{
    console.log('redis连接成功');
})
exports.redis = redis
```

### 操作视频热度

> model/redis/redishotsinc.js

```javascript
/**
 * 用来做视频热度的增长
 */
const {redis} = require('./index')
exports.hotInc = async(videoId,incNum)=>{
    let isExit = redis.zscore('hotvideo',videoId)
    let inc
    if(isExit){
        inc = await redis.zincrby('hotvideo',incNum,videoId)
    }else{
        inc = await redis.zadd('hotvideo',incNum,videoId)
    }
    return inc
}
```

### 增加热度

```diff
// 收藏
exports.collectionVideo = async(req,res)=>{
    let userId = req.userInfo._id
    let {videoId} = req.params
    let video
    try {
        video = await Video.findById(videoId)
        if(!video){
            return res.status(500).json({err:'视频不存在'})
        }
    } catch (error) {
        return res.status(500).json({err:'视频不存在'})
    }
    let doc = await Collectvideo.findOne({
        user:userId,
        video:videoId
    })
    if(doc){
        return res.status(200).json({msg:'您已收藏该视频'})
    }
    let mycollect = await new Collectvideo({
        user:userId,
        video:videoId
    }).save()
+   if(mycollect){
+       hotInc(videoId,3)
+   }
    res.status(200).json({mycollect})
}
```

## 获取热门视频

### 业务逻辑

> model/redis/redishotsinc.js

```javascript
// 获取热门视频
exports.topHots = async(num)=>{
    let paixu = await redis.zrange('hotvideo',0,-1,'withscores')
    let newPaixu = paixu.slice(0,num*2)
    let obj = {}
    for(let i = 0;i<newPaixu.length;i++){
        if(i%2==0){
            obj[newPaixu[i]] = newPaixu[i+1]
        }
    }
    return obj
}
```

> controller/videoController.js

```javascript
// 获取热门视频
exports.getTopHots = async(req,res)=>{
    let {topnum} = req.params
    const range = await topHots(topnum)
    res.status(200).json(range)
}
```

