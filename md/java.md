# Java
需要掌握继承、接口和包三个概念
### 继承
```Java
SomeClass some = new SomeClass();
// import SuperClass
public class subclass extends SuperClass {}
```
利用继承的方法，可以重用已存在类的方法和属性。而不用重写这些代码。被继承的类称为超类（super class），派生的类称为子类（subclass）

当创建一个新的对象时，Java将记录该对象及其超类的每个变量。这样所有的类组合成当前对象的模板，每个对象都将包含合适的信息。
方法的工作原理与此相似，新对象可以访问其所属类及其超类中的所有方法，这是在运行期间当方法被使用时动态确定的。如在该对象未能找到方法，则从超类中查找，并一级级向上。
### 接口
在Java中，接口可理解为对象间相互通信的协议。接口在继承中扮演着很重要的角色。
接口只定义派生要用到的方法，但是方法的具体实现完全取决于派生类。

### Java 包
包主要用来对类和接口进行分类。当开发 Java 程序时，可能编写成百上千的类，因此很有必要对类和接口进行分类。

## Java 基础语法
一个Java程序可以认为是一系列对象的集合，而这些对象通过调用彼此的方法来协同工作。  
**对象：** 对象是类的一个实例，有状态和行为。例如，一只鸭子是一个对象，它的状态有：颜色、重量、高度；行为：吃、喝、拉、撒  
**类：** 类是一个模板，它描述一类对象的行为和状态  
**方法：** 方法就是行为，一个类可以有很多方法。逻辑运算、数据修改以及所有动作都是在方法中完成的。  
**实例变量：** 每个对象都有独特的实例变量，对象的状态由这些实例变量的值决定。  

### 基本语法
注意：
**大小写敏感：** X与x是不同的  
**类名：** 对于所有的类来说，类名的首字母应该是大写。如果类名由若干单词组成，那么需要采取大驼峰命名方式，即每个单词的首字母应该大写，例如ShowDetailClass  
**方法名：** 所有的方法名都应该以小写字母开头，如果方法名含有若干单词，则后面的每个单词首字母大写。  
**源文件名：** 源文件名必须与类名相同。当保存文件的时候，你应该使用类名作为文件名保存（注意大小写敏感），文件后缀.java  
**主方法入口：** 所有的Java程序由`public static void main(String[] args)`方法开始执行  

### Java标识符
Java所有的组成部分都需要名字。类名、变量名以及方法名都被成为标识符。  
关于Java标识符，有以下几点需要注意：  
+ 所有的标识符都应该以字母（A-Z 或 a-z），美元符（$），下划线（_）开始
+ 首字符之后可以是字母（A-Z 或 a-z），美元符（$），下划线（_）或数字的任何字符组合
+ 关键字不能作为标识符
+ 标识符是大小写敏感的

### Java修饰符
像其他语言语言一样，Java可以使用修饰符来修饰类中的方法和属性。主要有两类修饰符：
+ 访问控制修饰符：default, public, protected, private
+ 非访问控制修饰符：final, abstract, static, synchronized

### Java变量
+ 局部变量 在方法、构造方法或者语句块中定义的变量被称为局部变量。变量声明和初始化都是在方法中，方法结束后，变量就会自动销毁。
+ 类变量（静态变量） 类变量也声明在类中，方法体之外，但必须声明为 static 类型。
+ 成员变量（非静态变量） 成员变量是定义在类中，方法体之外的变量。这种变量在创建对象的时候实例化。成员变量可以被类中方法、构造方法和特定类的语句块访问。
```java
public class Variable{
    static int allClicks=0;    // 类变量

    String str="hello world";  // 实例变量

    public void method(){
        int i =0;  // 局部变量
    }
}
```

### Java数组
数组是存储在堆上的对象，可以保存多个同类型变量。

### Java枚举
枚举限制变量只能是预先设定好的值，使用枚举可以减少代码中的bug

### 关键字
<table>
<theader><tr>
<th>类别</th>
<th>关键字</th>
<th>说明</th>
</tr>
</theader>
<tbody>
<tr>
<td rowspan="4" align="center">访问控制</td>
<td>private</td>
<td>私有的</td>
</tr>
<tr>
<td>protected</td>
<td>受保护的</td>
</tr>
<tr>
<td>public</td>
<td>公共的</td>
</tr>
<tr>
<td>default </td>
<td>默认</td>
</tr>
<tr>
<td rowspan="13" align="center">类、方法和变量修饰符</td>
<td>abstract</td>
<td>声明抽象</td>
</tr>
<tr>
<td>class</td>
<td>类</td>
</tr>
<tr>
<td>extends</td>
<td>扩充,继承</td>
</tr>
<tr>
<td>final</td>
<td>最终值,不可改变的</td>
</tr>
<tr>
<td>implements</td>
<td>实现（接口）</td>
</tr>
<tr>
<td>interface</td>
<td>接口</td>
</tr>
<tr>
<td>native</td>
<td>本地，原生方法（非 Java 实现）</td>
</tr>
<tr>
<td>new</td>
<td>新,创建</td>
</tr>
<tr>
<td>static</td>
<td>静态</td>
</tr>
<tr>
<td>strictfp</td>
<td>严格,精准</td>
</tr>
<tr>
<td>synchronized</td>
<td>线程,同步</td>
</tr>
<tr>
<td>transient</td>
<td>短暂</td>
</tr>
<tr>
<td>volatile</td>
<td>易失</td>
</tr>
<tr>
<td rowspan="12" align="center">程序控制语句</td>
<td>break</td>
<td>跳出循环</td>
</tr>
<tr>
<td>case</td>
<td>定义一个值以供 switch 选择</td>
</tr>
<tr>
<td>continue</td>
<td>继续</td>
</tr>
<tr>
<td>default</td>
<td>默认</td>
</tr>
<tr>
<td>do</td>
<td>运行</td>
</tr>
<tr>
<td>else</td>
<td>否则</td>
</tr>
<tr>
<td>for</td>
<td>循环</td>
</tr>
<tr>
<td>if</td>
<td>如果</td>
</tr>
<tr>
<td>instanceof</td>
<td>实例</td>
</tr>
<tr>
<td>return</td>
<td>返回</td>
</tr>
<tr>
<td>switch</td>
<td>根据值选择执行</td>
</tr>
<tr>
<td>while</td>
<td>循环</td>
</tr>
<tr>
<td rowspan="6" align="center">错误处理</td>
<td>assert</td>
<td>断言表达式是否为真</td>
</tr>
<tr>
<td>catch</td>
<td>捕捉异常</td>
</tr>
<tr>
<td>finally</td>
<td>有没有异常都执行</td>
</tr>
<tr>
<td>throw</td>
<td>抛出一个异常对象</td>
</tr>
<tr>
<td>throws</td>
<td>声明一个异常可能被抛出</td>
</tr>
<tr>
<td>try</td>
<td>捕获异常</td>
</tr>
<tr>
<td rowspan="2" align="center">包相关</td>
<td>import</td>
<td>引入</td>
</tr>
<tr>
<td>package</td>
<td>包</td>
</tr>
<tr>
<td rowspan="8" align="center">基本类型</td>
<td>boolean</td>
<td>布尔型</td>
</tr>
<tr>
<td>byte</td>
<td>字节型</td>
</tr>
<tr>
<td>char</td>
<td>字符型</td>
</tr>
<tr>
<td>double</td>
<td>双精度浮点</td>
</tr>
<tr>
<td>float</td>
<td>单精度浮点</td>
</tr>
<tr>
<td>int</td>
<td>整型</td>
</tr>
<tr>
<td>long</td>
<td>长整型</td>
</tr>
<tr>
<td>short</td>
<td>短整型</td>
</tr>

<tr>
<td rowspan="3" align="center">变量引用</td>
<td>super</td>
<td>父类,超类</td>
</tr>
<tr>
<td>this</td>
<td>本类</td>
</tr>
<tr>
<td>void</td>
<td>无返回值</td>
</tr>
<tr>
<td rowspan="3" align="center">保留关键字</td>
<td>goto</td>
<td>是关键字，但不能使用</td>
</tr>
<tr>
<td>const</td>
<td>是关键字，但不能使用</td>
</tr>
<tr>
<td>null</td>
<td>空</td>
</tr>
</tbody></table>

### Java注释
单行`//`，多行`/**/`

### Java空行
空白行或注释行，编译器会忽略。

### Java对象和类
在Java中，一个类可以由其他类派生。如果你要创建一个类，而且已经存在一个类具有你所需要的属性或方法，那么你可以将新创建的类继承该类。  


+ 多态
+ 继承
+ 封装
+ 抽象
+ 类
+ 对象
+ 实例
+ 方法
+ 重载

### 源文件声明规则
+ 一个源文件中只能由一个public类
+ 一个源文件可以由多个非public类
+ 源文件的名称应该和public类的类名保持一致。
+ 如果一个类定义在某个包中，那么package语句应该在源文件首行。
+ 如果源文件包含import语句，那么应该放在package语句和类定义之间。如果没有package语句，那么import语句应该在源文件最前面。
+ import语句和package语句对源文件中定义的所有类都有效。同一个源文件中，不能给不同的类不同的包声明。

## Java数据类型
+ 内置数据类型
  1. `byte`数据类型是8位、有符号的，以二进制补码表示的整数；最小值`-128(-2^7)`，最大值`127(2^7-1)`，默认为0
  2. `short`数据类型是16位、有符号的以二进制补码表示的整数；最小值`-32768(-2^15)`，最大值`32767(2^15-1)`，默认为0
  3. `int`数据类型是32位、有符号的以二进制补码表示的整数；最小值`-2,147,483,648(-2^31)`，最大值`2,147,483,647(2^32-1)`，默认为0
  4. `long`数据类型是64位、有符号的以二进制补码表示的整数；最小值`-9,223,372,036,854,775,808(-2^63)`，最大值`9,223,372,036,854,775,807(2^64-1)`，默认为`0L`("L"理论上不分大小写，但是若写成"l"容易与数字"1"混淆，不容易分辩。所以最好大写。)
  5. `float`数据类型是单精度、32位、符合IEEE 754标准的浮点数；在储存大型浮点数组的时候可节省内存空间；默认为`0.0f`；浮点数不能用来表示精确的值，如货币
  6. `double`数据类型是单精度、64位、符合IEEE 754标准的浮点数；浮点数的默认类型是`double`；默认为`0.0d`
  7. `boolean`数据类型表示一位的信息；只作为一种标志来记录 true/false 情况；默认为`false`
  8. `char`类型是一个单一的16位 Unicode 字符；最小值是`\u0000`（即为 0）,最大值是`\uffff`（即为65、535）,`char`数据类型可以储存任何字符
+ 引用数据类型
    1. 引用类型的变量非常类似于C/C++的指针。引用类型指向一个对象，指向对象的变量是引用变量。这些变量在声明时被指定为一个待定的类型，声明后，类型就不能被改变了。
    2. 对象、数组都是引用数据类型，所有引用类型的默认值都是`null`
    3. 一个引用变量可以用来引用任何与之兼容的类型
+ String  
    String是一个很特殊的类，它有一个字符串池。java的内存模型大体分为`堆`和`栈`（细分还有方法区，和程序计数器等）。
    > 1.基本类型的变量放在栈里；  
2.封装类型中，对象放在堆里，对象的引用放在栈里。

    `java在方法传递参数时，是将变量复制一份，然后传入方法体去执行。`
+ 常量  
  在程序运行时不可被修改。使用`final`关键字来修饰常量，声明方式和常量类似
  ```java
  // 一般采用大写字符声明
  final double PI = 3.1415926;
  ```
  `byte`, `int`, `long` 和`short` 都可以用10进制、16进制的方式来表示。当使用字面量的时候，前缀`0`表示8进制，`0x`表示16进制。
  ```Java
  int decimal = 100;
  int octal = 0144;
  int hexa =  0x64;
  ```
  字符串需要用双引号，字符串常量和字符常量都可以包含任何Unicode字符。例如：
  ```Java
  String a = '\u0001';
  char c = '\u0001';
  ```
### 类型转换

必须满足转换前的数据类型的位数要低于转换后的数据类型，例如: `short`数据类型的位数为16位，就可以自动转换位数为32的int类型，同样`float`数据类型的位数为32，可以自动转换为64位的`double`类型。
```java
byte, short, char —> int —> long—> float —> double
```
数据类型转换必须满足如下规则：
1. 不能对boolean类型进行类型转换。
2. 不能把对象类型转换成不相关类的对象。
3. 在把容量大的类型转换为容量小的类型时，必须使用强制类型转换。
4. 转换过程中可能导致溢出或损失精度，例如：
    ```java
    int i = 128;   
    byte b = (byte)i;
    // byte 类型是 8 位，最大值为127，所以当 int 强制转换为 byte 类型时，值 128 时候就会导致溢出。
    ```
5. 浮点数到整数的转换是通过舍弃小数得到，而不是四舍五入，例如：
   ```java
    (int)23.7 == 23;        
    (int)-45.89f == -45
    ```

#### 自动
整型、实型（常量）、字符型数据可以混合运算。运算中，不同类型的数据先转化为同一类型，然后进行运算。  
  ```Java
    char c1 = 'a';//定义一个char类型
    int i1 = c1;//char自动类型，通过ASCII转换为int
  ```

#### 强制
必须满足转换前的数据类型的位数要低于转换后的数据类型，例如: `short`数据类型的位数为16位，就可以自动转换位数为32的`int`类型，同样`float`数据类型的位数为32，可以自动转换为64位的`double`类型。
  ```Java
    int i1 = 123;
    byte b1 = (byte)i1;// (type)value type
  ```
### 修饰符
#### 访问修饰符
+ default 默认，什么都不写；同一个包内可见。使用对象：类、接口、变量、方法
+ private 在同一个类内可见。使用对象：变量、方法。**注意：不能修饰类（外部类）**
+ public 对所有类可见。使用对象：类、接口、变量、方法
+ protected 对同一个包内的类和所有子类可见。使用对象：变量、方法。**注意：不能修饰类（外部类）**
#### 非访问修饰符
+ static 修饰符，用来修饰类方法和类变量。
+ final 修饰符，用来修饰类、方法和变量，final 修饰的类不能够被继承，修饰的方法不能被继承类重新定义，修饰的变量为常量，是不可修改的。
+ abstract 修饰符，用来创建抽象类和抽象方法。
+ synchronized 和 volatile 修饰符，主要用于线程的编程。

