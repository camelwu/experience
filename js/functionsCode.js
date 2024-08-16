var conjoin = function (a, b) {
    return a + b;
}
var breed = (a, b) => {
    return a * b;
}
const sayHello = (name) => {
    return `Hello ${name}`;
}
//say hello to a person, don't need include another function, example: sayHello('John'); 
const hi = (name) => {
    return sayHello(name);
}
const Calls = (cb) => {
    return cb;
}
Calls(sayHello('John'));
function ajaxCall(url, callback, method = 'GET') {
    // check it's browser
    if (typeof XMLHttpRequest === 'undefined') {
        // if not, it's node, we can use the 'http' module
        var http = require('http');
        var req = http.request({
            host: url.host, // the url of the server
            port: url.port, // the port of the server
            path: url.path, // the path of the server
            method: method // the method of the server
        }, function (res) {
            var data = '';
            res.on('data', function (chunk) {
                data += chunk;
            });
            res.on('end', function () {
                callback(data);
            });
        });
        req.end();
    } else {
        // if it is, we can use the 'XMLHttpRequest' object
        var xhr = new XMLHttpRequest();
        xhr.open(method, url, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                callback(xhr.responseText);
            }
        }
        xhr.send();
    }
}
function yu1(a) { return a; }
function yu2(b) { return yu1(b); }
// the bad call way
const getServerStaff = (callback) => {
    ajaxCall('/api/serverStaff', (data) => {
        callback(data);
    });
}
// the better call way
// const getServerStuff = ajaxCall('/api/serverStaff');
//
function compose(f, g) { return function (x) { return f(g(x)); } }
function toUpperCase(x) { return x.toUpperCase(); }
function exclaim(x) { return x + '!'; }
let shout = compose(exclaim, toUpperCase);

console.log(shout('send in the clowns'))
// ajaxCall('d', json => callback(json));//the bad call way
// ajaxCall(callback);

// let makes = [].map(car => (car.make))