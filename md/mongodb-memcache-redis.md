# mongo的特点
本文大部分是归纳，并无太多个人思路

## mongodb、memcache和redis的简单比较

redis、memcahce 比较相似，但与 mongodb 完全不同，几乎没有可比性。

总的来说 redis/memcache 是基于内存的，讲究的是性能，多用作缓存层，比如说存放session。而 mongodb 是面向文档的，存储的是类似JSON的非结构化数据，查询起来非常方便，开发效率高，比较类似传统SQL关系型数据库。

从以下几个维度，对redis、memcache、mongoDB 做了对比：

1. 体积

Redis是一个基于内存的键值数据库，它由C语言实现的，以单线程异步的方式工作，与Nginx/ NodeJS工作原理近似。所以文件非常小。编绎出来的主文件还不到 2Mb，在 Linux 服务器上初始只需要占用1Mb左右的内存。

Mongodb安装包则要大的多，跟mySQL差不多，都是百兆级的。

2. 性能

都比较高，性能对我们来说应该都不是瓶颈

总体来讲，TPS方面redis和memcache差不多，要大于mongodb

3. 操作的便利性

memcache数据结构单一

redis丰富一些，数据操作方面，redis更好一些，较少的网络IO次数

mongodb支持丰富的数据表达，索引，最类似关系型数据库，支持的查询语言非常丰富

4. 内存空间的大小和数据量的大小

redis在2.0版本后增加了自己的VM特性，突破物理内存的限制；可以对key value设置过期时间（类似memcache）

memcache可以修改最大可用内存,采用LRU算法

mongoDB适合大数据量的存储，依赖操作系统VM做内存管理，吃内存也比较厉害，服务不要和别的服务在一起

5.可用性（单点问题）

对于单点问题，

redis，依赖客户端来实现分布式读写；主从复制时，每次从节点重新连接主节点都要依赖整个快照,无增量复制，因性能和效率问题，

所以单点问题比较复杂；不支持自动sharding,需要依赖程序设定一致hash 机制。

一种替代方案是，不用redis本身的复制机制，采用自己做主动复制（多份存储），或者改成增量复制的方式（需要自己实现），一致性问题和性能的权衡

Memcache本身没有数据冗余机制，也没必要；对于故障预防，采用依赖成熟的hash或者环状的算法，解决单点故障引起的抖动问题。

mongoDB支持master-slave,replicaset（内部采用paxos选举算法，自动故障恢复）,auto sharding机制，对客户端屏蔽了故障转移和切分机制。

6.可靠性（持久化）

对于数据持久化和数据恢复，

redis支持（快照、AOF）：依赖快照进行持久化，aof增强了可靠性的同时，对性能有所影响

memcache不支持，通常用在做缓存,提升性能；

MongoDB从1.8版本开始采用binlog方式支持持久化的可靠性

7.数据一致性（事务支持）

Memcache 在并发场景下，用cas保证一致性

redis事务支持比较弱，只能保证事务中的每个操作连续执行

mongoDB不支持事务

8.数据分析

mongoDB内置了数据分析的功能(mapreduce),其他不支持

9.应用场景

redis：数据量较小的更性能操作和运算上

memcache：用于在动态系统中减少数据库负载，提升性能;做缓存，提高性能（适合读多写少，对于数据量比较大，可以采用sharding）

MongoDB:主要解决海量数据的访问效率问题

## MongoDB vs MySQL
### 术语和概念
MongoDB很多概念和MySQL类似
```
MySQL    MongoDB  
Table    Collection  
Row      Document  
Column   Field  
Joins    Embedded documents, linking 
```

### 特性比较
像MySQL一样，MongoDB也提供丰富的特性，也有自己的查询语言，高可用的二级索引（包括文本搜索和地理位置），强大，高聚合数据分析框架，比关系型数据库有着更加丰富的数据类型和可扩展性

```
                     MySQL          MongoDB
Rich Data Model        No             Yes  
Dyamic Schema          No             Yes  
Typed Data             Yes            Yes  
Data Locality          No             Yes  
Field Updates          Yes            Yes  
Easy for Programmers   No             Yes  
Complex Transactions   Yes            No  
Auditing               Yes            Yes  
Auto-Sharding          No             Yes
```
### 查询操作
```
# sql
# 查询
select * form table where condition
# 更新
update table set field1='somevalue',field2='somevalue' where id=1
# 插入
insert into table (field1,field2) values ("sv","sv")
# mongodb
# 查询
db.conections.find({}) or {username:'test'}
# 更新
db.connections.update({查询条件},{$set:{值}},multi:true)
# 插入
# new 或 save
db.users.insert({  
    user_id: "bcd001", 
    age: 45, 
    status: "A"
})

```


