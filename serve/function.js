const Calls = (cb) => {
    return cb;
}
const sayHello = (name) => {
    return `Hello ${name}`;
}
let t = Calls(str => sayHello(str));
console.log(t);
console.log(t('John'));
console.log(sayHello('Pul'));
function add(x) {
    return function (y) {
        return x + y;
    }
}
console.log(add(1));
/*
const BlogController = {
    index(posts) { return Views.index(posts); },
    show(post) { return Views.show(post); },
    create(attrs) { return Db.create(attrs); },
    update(post, attrs) { return Db.update(post, attrs); },
    destroy(post) { return Db.destroy(post); },
};

const BC = {
    index: Views.index,
    show: View.show,
    create: Db.create,
    update: Db.update,
    destroy: Db.destroy,
}
*/
const validArticles = (articles) => articles.filter(article => article.valid);
function VA(articles) {
    return articles.filter(function (article) {
        return article.valid;
    })
}
function compact(xz) {
    return xz.filter(function (x) {
        return x && x !== null && x !== undefined;
    });
}

var xs = [1, 2, 3, 4, 5];
console.log(xs.slice(0, 3));
console.log(xs.slice(0, 3));
console.log(xs);
console.log(xs.splice(-1));
console.log(xs);

function square(n) {
    return n * n;
}

function squareNumber(x) {
    return memoize(square)(x);
}
const squareNumbers = memoize(square);
function memoize(f) {
    var cache = {};
    return function () {
        var key = JSON.stringify(arguments);
        cache[key] = cache[key] || f.apply(f, arguments);
        return cache[key];
    }
}

console.log(squareNumber(5));
console.log(squareNumbers(4));

// 实现一个函数，对数组进行过滤，过滤掉小于n的项
function filterArray(arr, n) {
    return arr.filter(function (item) {
        return item >= n;
    });
}
// 柯里化实现对一个数组进行过滤，过滤掉小于n的项
function filterArray(n) {
    return function (arr) {
        return arr.filter(function (item) {
            return item >= n;
        });
    };
}
var obj = {
    a: 'a',
    b: 'b',
    c: 'c',
    d: 'd'
}
console.log('...obj');
console.log(...xs);
function composer(){
    let ary = [...arguments];
    console.log(typeof arguments);
    console.log(ary);
    let strack = []
    strack.push(ary.splice(-1))
}
const compose = (f, g) => x => f(g(x));
const toUpperCase = x => x.toUpperCase();

const exclaim = x => x + '!';
const shout = compose(exclaim, toUpperCase);

console.log(shout('hello'));

var g = function(x){ console.log('g');return x.length; };
var f = function(x){ console.log('f');return x === 4; };
var isFourLetterWord = compose(f, g, function(){console.log('h');return 'hello';});
isFourLetterWord('hello');

var head = function(x) { return x[0]; };

// var initials = compose(join('. '), map(compose(toUpperCase, head)), split(' '));
var initials = function (name) {
    return name.split(' ').map(compose(toUpperCase, head)).join('. ');
  };
initials("hunter stockton thompson");
