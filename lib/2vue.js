
function defineReactive(data, key, val) {
    var dep = new Dep();
    observer(val);
    Object.defineProperty(data, key, {
        enumerable: true,
        configurable: true,
        set: function (newVal) {
            if (val === newVal) return;
            val = newVal;
            console.log('You listen ' + key + ', set a new val: ' + newVal.toString());
            dep.notify();
        },
        get: function () {
            Dep.target && dep.addSub(Dep.target);
            return val;
        }
    });
}
function observer(data) {
    if (!data || typeof (data) !== "object") {
        return;
    }
    Object.keys(data).forEach(function (key) {
        defineReactive(data, key, data[key]);
    })
}
var example = {
    book1: '',
    book2: {
        name: 'vue2'
    }
};
function Dep() {
    this.subs = [];
}
Dep.prototype = {
    addSub: function (sub) {
        this.subs.push(sub);
    },
    notify: function () {
        this.subs.forEach(function (sub) {
            sub.update();
        });
    },
    target: null
}

function Watcher(vm, prop, cb) {
    this.vm = vm;
    this.prop = prop;
    this.callback = cb;
    this.value = this.get();
}
Watcher.prototype = {
    get: function () {
        Dep.target = this;
        // this.value = data[key];
        const value = this.vm.$data[this.prop];
        Dep.target = null;
        return value;
    },
    update: function () {
        const value = this.vm.$data[this.prop];
        const oldVal = this.value;
        if (value !== oldVal) {
            this.value = value;
            this.callback(value);
        }
    }
}

function Mvue(options) {
    this.$options = options;
    this.$data = options.data;

    this.$el = document.querySelector(options.el);
    //
    Object.keys(this.$data).forEach(key => {
        this.proxyData(key);
    });

    this.init();
}
Mvue.prototype = {
    init: function () {
        observer(this.$data);
        new Compile(this);
        // this.$el.textContent = this.$data[this.$prop];
        // new Watcher(this, this.$prop, value => {
        //     this.$el.textContent = value;
        // });
    },
    proxyData: function (key) {
        Object.defineProperty(this, key, {
            get: function () {
                return this.$data[key]
            },
            set: function (value) {
                this.$data[key] = value;
            }
        });
    }
}
function Compile(vm) {
    this.vm = vm;
    this.el = vm.$el;
    this.fragment = null;
    this.init();
}
Compile.prototype = {
    init: function () {
        this.fragment = this.nodeFragment(this.el);
    },
    nodeFragment: function (el) {
        const fragment = document.createDocumentFragment();
        let child = el.firstChild;
        //将子节点，全部移动文档片段里
        while (child) {
            fragment.appendChild(child);
            child = el.firstChild;
        }
        return fragment;
    },
    compileNode: function (fragment) {
        let childNodes = fragment.childNodes;
        [...childNodes].forEach(function (node) {
            let reg = /\{\{(.*)\}\}/;
            let text = node.textContent;
            if (this.isElementNode(node)) {
                this.compile(node); //渲染指令模板
            } else if (this.isTextNode(node) && reg.test(text)) {
                let prop = RegExp.$1;
                this.compileText(node, prop); //渲染{{}} 模板
            }
        })
    }
}

