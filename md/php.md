#PHP最容易入手的后端语言

PHP7.0全面一致支持64位。
PHP7.0之前出现的致命错误，都改成了抛出异常。
增加了空结合操作符（？？）。效果相当于三元运算符。
PHP7.0新增了函数的返回类型声明。
PHP7.0新增了标量类型声明。
PHP 7 中的函数的形参类型声明可以是标量。在 PHP 5 中只可以是类名、接口、array 或者 callable (PHP 5.4，即可以是函数，包括匿名函数)，现在也可以使用 string、int、float和 bool 了。
新增加了匿名类。
PHP 5.3 开始有了匿名函数，现在又新增了匿名类；
PHP7.0之后溢移除了一些老的不再支持的SAPI(服务器端应用编程端口)和扩展。
define 可以定义常量数组。
PHP 7 增加了对返回类型声明的支持。 类似于参数类型声明，返回类型声明指明了函数返回值的类型

PDO::quote($_GET['username']);
1. PHP版本7之后，DB连接最好采用PDO。


分页方式
```
<?php
 
/*
 * PDO数据库操作函数库
 */
if (!function_exists("connect")) {
 
	/*
	 * 数据库连接
	 * @param type $dbname
	 * @param type $type
	 * @param type $host
	 * @param type $charset
	 * @param type $port
	 * @param string $user
	 * @param string $pass
	 */
	function connect($dbname, $type = 'mysql', $host = '127.0.0.1', $charset = 'utf8', $port = '3306', $user = 'root', $pass = 'root') {
		$dsn = "{$type}:host={$host};dbname={$dbname};charset={$charset};port={$port}";
		$user = $user;
		$pass = $pass;
		$options = [
		    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, //错误模式
		    PDO::ATTR_CASE => PDO::CASE_NATURAL, // 自然名称
		    PDO::ATTR_EMULATE_PREPARES => true, // 启用模拟功能
		    PDO::ATTR_PERSISTENT => true,
		];
		try {
			$pdo = new PDO($dsn, $user, $pass, $options);
//			echo 'connect ok!';
		} catch (PDOException $e) {
			print '连接错误' . $e->getMessage();
			die();
		}
		return $pdo;
	}
 
}
if (!function_exists("insert")) {
 
	/*
	 * 新增数据
	 * @param type $pdo
	 * @param type $tabname
	 * @param type $data
	 */
	function insert($pdo, $tabname, $data = []) {
		// insert news set title = :title, content = :content;
		$sql = "insert ignore {$tabname} set ";
		foreach (array_keys($data) as $v) {
			$sql .= $v . ' =:' . $v . ', ';
		}
		$sql = rtrim(trim($sql), ',');
//		die($sql);
		$stmt = $pdo->prepare($sql);
		foreach ($data as $k => $v) {
			$stmt->bindValue(":{$k}", $v);
		}
		if ($stmt->execute()) {
			if ($stmt->rowCount() > 0) {
				return true;
			}
		} else {
			return false;
		}
	}
 
}
 
if (!function_exists("update")) {
 
	/*
	 * 更新数据
	 * @param type $pdo
	 * @param type $tabname
	 * @param type $data
	 * @param type $where
	 */
	function update($pdo, $tabname, $data = [], $where = '') {
		// update news set title = :title, content = :content where id = 1
		$sql = "update $tabname set ";
		foreach (array_keys($data) as $v) {
			$sql .= $v . " = :" . $v . ', ';
		}
		$sql = rtrim(trim($sql), ',');
		if (!empty($where)) {
			$sql .= " where " . $where;
		} else {
			exit('条件不能为空');
		}
		$stmt = $pdo->prepare($sql);
		foreach ($data as $k => $v) {
			$stmt->bindValue(":{$k}", $v);
		}
		if ($stmt->execute()) {
			if ($stmt->rowCount() > 0) {
				return true;
			}
		} else {
			return false;
		}
	}
 
}
 
if (!function_exists("find")) {
 
	/*
	 * 查询单条记录
	 * @param type $pdo
	 * @param type $tabname
	 * @param type $fields
	 * @param type $where
	 */
	function find($pdo, $tabname, $fields, $where = '') {
		$sql = "select ";
		if (is_array($fields)) {
			foreach ($fields as $v) {
				$sql .= $v . ',';
			}
		} else {
			$sql .= $fields . ',';
		}
		$sql = rtrim(trim($sql), ',');
		$sql .= " from $tabname ";
		if (!empty($where)) {
			$sql .= " where " . $where;
		}
		$sql .= ' limit 1';
		$stmt = $pdo->prepare($sql);
		if ($stmt->execute()) {
			if ($stmt->rowCount() > 0) {
//				$stmt->setFetchMode(PDO::FETCH_ASSOC);
				return $stmt->fetch(PDO::FETCH_ASSOC);
			}
		} else {
			return false;
		}
	}
 
}
 
if (!function_exists("select")) {
 
	/*
	 * 查询多条记录
	 * @param type $pdo
	 * @param type $tabname
	 * @param type $fields
	 * @param type $where
	 * @param type $order
	 * @return boolean
	 */
	function select($pdo, $tabname, $fields, $where = '', $order = '') {
		$sql = "select ";
		if (is_array($fields)) {
			foreach ($fields as $v) {
				$sql .= $v . ',';
			}
		} else {
			$sql .= $fields . ',';
		}
		$sql = rtrim(trim($sql), ',');
		$sql .= " from $tabname ";
		if (!empty($where)) {
			$sql .= " where " . $where;
		}
		if (!empty($order)) {
			$sql .= " order by " . $order;
		}
		
		$stmt = $pdo->prepare($sql);
//		die($stmt->queryString);  查看sql语句
		if ($stmt->execute()) {
			if ($stmt->rowCount() > 0) {
//				$stmt->setFetchMode(PDO::FETCH_ASSOC);
				return $stmt->fetchAll(PDO::FETCH_ASSOC);
			}
		} else {
			return false;
		}
	}
 
}
 
if (!function_exists("delete")) {
 
	/*
	 * 删除一条记录
	 * @param type $pdo
	 * @param type $tabname
	 * @param type $where
	 */
	function delete($pdo, $tabname, $where) {
		$sql = "delete from $tabname ";
		if (!empty($where)) {
			$sql .= "where " . $where;
		} else {
			exit('条件不能为空');
		}
		$stmt = $pdo->prepare($sql);
		if ($stmt->execute()) {
			if ($stmt->rowCount() > 0) {
				return true;
			}
		} else {
			return false;
		}
	}
} 
```

pagination

```
<?php
/*
 * 分页函数
 * @param type $p
 * @param type $page
 */
function paging($p, $page) {
	$str = "<ul class = 'pagination'>";
	$str .= "<li><a href = '?p=1'>首页</a></li>";
	if ($p == 1) {
		$str .= "<li class='disabled'><a href='javascript:;'>上一页</a></li>";
	} else {
		$str .= "<li><a href='?p=" . ($p - 1) . "'>上一页</a></li>";
	}
	$active = '';
	for ($i = 1; $i <= $page; $i++) {
		if ($p == $i) {
			$active = 'active';
		} else {
			$active = '';
		}
		$str .= "<li class='{$active}'><a href='?p={$i}'>{$i}</a></li>";
	}
	if ($p == $page) {
		$str .= "<li class='disabled'><a href='javascript:;'>下一页</a></li>";
	} else {
		$str .= "<li><a href='?p=" . ($p + 1) . "'>下一页</a></li>";
	}
	$str .= "<li><a href='?p={$page}'>尾页</a></li>";
	$str .= "</ul>";
	return $str;
}
```
2. 框架

TP

CI

Laravel



PHP7和PHP5进行简单对比，性能确实有3到4倍提升，无论是在php纯脚本中，还是在框架中，PHP7高性能的表现都是一致的。

PHP7很快，PHP7+OpCache飞快，PHP7确实牛逼，PHP的新时代已来临，赶紧用起来！