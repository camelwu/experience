const _ = require('ramda');
const curry = _.curry;
// console.log(curry);
const match = curry(function (what, str) {
    return str.match(what);
});
const replace = curry(function (what, replacement, str) {
    return str.replace(what, replacement);
});

const filter = curry(function (f, ary) {
    return ary.filter(f);
});

const map = curry(function (f, ary) {
    return ary.map(f);
});

console.log(match(/\s+/g)('hello world!'));
var hasSpaces = match(/\s+/g);
// console.log(typeof hasSpaces)

function add(x) {
    return function (y) {
        return x + y;
    };
}

var increment = add(1);
var addTen = add(10);

increment(2);
addTen(13);
var trace = curry(function(tag, x){
    console.log(tag, x);
    return x;
  });
// console.log(_.compose);
// 示例数据
var CARS = [
    { name: "Ferrari FF", horsepower: 660, dollar_value: 700000, in_stock: true },
    { name: "Spyker C12 Zagato", horsepower: 650, dollar_value: 648000, in_stock: false },
    { name: "Jaguar XKR-S", horsepower: 550, dollar_value: 132000, in_stock: false },
    { name: "Audi R8", horsepower: 525, dollar_value: 114200, in_stock: false },
    { name: "Aston Martin One-77", horsepower: 750, dollar_value: 1850000, in_stock: true },
    { name: "Pagani Huayra", horsepower: 700, dollar_value: 1300000, in_stock: false }
];
var isLastInStock = function (cars) {
    var last_car = _.last(cars);
    return _.prop('in_stock', last_car);
};

var isLastInStocks = _.compose(_.prop('in_stock'), trace("after split"), _.last);

// 使用 _.compose()、_.prop() 和 _.head() 获取第一个 car 的 name
var nameOfFirstCar = _.compose(_.prop('name'), _.head);
console.log(nameOfFirstCar(CARS));


// 声明式
var makes = CARS.map(function(car){ return car.make; });

const array = [15, 16, 17, 18, 19];

function reducer(accumulator, currentValue, index) {
  const returns = accumulator + currentValue;
  console.log(
    `accumulator: ${accumulator}, currentValue: ${currentValue}, index: ${index}, returns: ${returns}`,
  );
  return returns;
}

array.reduce(reducer);

const sumWithInitial = array.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0,
  );
  console.log(sumWithInitial);