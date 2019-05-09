# MongoDB导入导出以及数据库备份

## 表导出：mongoexport
1. 概念：  
    mongoDB中的mongoexport工具可以把一个collection导出成JSON格式或CSV格式的文件。可以通过参数指定导出的数据项，也可以根据指定的条件导出数据。
2. 语法：  
    mongoexport -d dbname -c collectionname -o file --type json/csv -f field
    参数说明：
        -d ：数据库名
        -c ：collection名
        -o ：输出的文件名
        --type ： 输出的格式，默认为json
        -f ：输出的字段，如果-type为csv，则需要加上-f "字段名"
3. 示例：
```
sudo mongoexport -d test -c users -o ~/Desktop/mongoDB/users.json --type json -f  "_id,user_id,user_name,age,status"
# or 完整表导出
sudo mongoexport -d test -c users -o ~/Desktop/mongoDB/users.json --type json
```

## json数据导入表：mongoimport
1. 语法：  
    mongoimport -d dbname -c collectionname --file filename --headerline --type json/csv -f field
    参数说明：
        -d ：数据库名
        -c ：collection名
        --type ：导入的格式默认json
        -f ：导入的字段名
        --headerline ：如果导入的格式是csv，则可以使用第一行的标题作为导入的字段
        --file ：要导入的文件

2. 示例：  
```
sudo mongoimport -d test -c users --file ~/Desktop/mongoDB/users.json --type json
``` 

----

## MongoDB数据库备份
1. 语法：
    mongodump -h dbhost -d dbname -o dbdirectory
    参数说明：
        -h： MongDB所在服务器地址，例如：127.0.0.1，当然也可以指定端口号：127.0.0.1:27017
        -d： 需要备份的数据库实例，例如：test
        -o： 备份的数据存放位置，例如：/home/mongodump/，当然该目录需要提前建立，这个目录里面存放该数据库实例的备份数据。
2. 示例：  
```
# 显示时间，我们可以用时间的不同做为备份文件的名字，这样以前的备份就不会被覆盖
date && cd ~/
# 定义时间变量名和显示时间格式
datename=$(date +%Y%m%d-%H%M%S)
#创建与时间相对应的文件
mkdir $datename
sudo mongodump -h 192.168.0.110:27017 -d test -o $datename
```

## MongoDB数据库恢复
1. 语法：
    mongorestore -h dbhost -d dbname --dir dbdirectory

    参数或名：
        -h： MongoDB所在服务器地址
        -d： 需要恢复的数据库实例，例如：test，当然这个名称也可以和备份时候的不一样，比如test2
        --dir： 备份数据所在位置，例如：~/backup/
        --drop： 恢复的时候，先删除当前数据，然后恢复备份的数据。就是说，恢复后，备份后添加修改的数据都会被删除，慎用！
2. 示例：  
```
mongorestore -h 192.168.0.110:27017 -d restore --dir ~/backup/
```
