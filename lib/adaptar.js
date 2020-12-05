// php|java接口的参数到业务函数适配。

function args_adapter(modle, obj) {
  // 新建一个对象而不是在原对象上操作降低该函数对外部对象的依赖
  var newObj = {};
  for (var i in modle) {
      newObj[i] = (obj[i] === undefined) ? modle[i] : obj[i];
  }
  return newObj;
}

function fun() {
  // arg是应该有的数据，或是默认值。
  var arg = { a: 1, b: 2, c: 3 };
  var modle = { age: 12, school: "beijing university", name: "test" };
  var obj = args_adapter(modle, ...arg);
  // 适配好数据，直接给业务代码。
  console.log(obj.age, obj.name, obj.school);
}

