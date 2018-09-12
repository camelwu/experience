class NEW {

}

function New(o) {
    var p = {}
    p.__proto__ = o.prototype
    o.call(p)
    return p
}
function parent() {
    this.name = 'father'
    this.age = 39
    this.getage = function () {
        return this.age;
    }
}
parent.prototype.toString = function(){
    return this.id
}
var daught = New(parent);
var son = new parent();
// son.id = '001'
console.dir(daught)
console.log(daught.toString())
