var twoSum = function (nums, target) {
    /*let i = 0, len = nums.length, res = [], myMap = new Map();
    console.log('begin');
    while (i < len) {
        console.log('loop');
        if (nums[i] < target) {
            let cache = target - nums[i];
            if (myMap.has(cache)) {
                res = [i, myMap.get(cache)];console.log(res);
                return res;
            } else {
                myMap.set(nums[i], i)
            }
        }
        i++;
    }
    console.log('ending', res);
    return res;*/
    var resultList = null;
    var currentNode = null;

    if (!resultList) {
        // create initial node on first iteration
        resultList = new ListNode(sum);
        currentNode = resultList;
    } else {
        // create new node and add as current node's 'next' node
        currentNode.next = new ListNode(sum);
        currentNode = currentNode.next;
    }
    var ret = [];
    var exist = {};
    for (var i = 0; i < nums.length; i++) {
        if (typeof (exist[target - nums[i]]) !== 'undefined') {
            ret.push(exist[target - nums[i]]);
            ret.push(i);
        }

        exist[nums[i]] = i;
    }
    console.log(ret)
    return ret
};
var lengthOfLongestSubstring = function (s) {
    if (s.length === 0) return 0
    if (s === ' ') return 1
    var len = s.length, res = 0, str = '', l = 1;
    for (let i = 0; i < len; i++) {
        if (str.indexOf(s[i]) > -1) {
            l = res > l ? res : l;
            str = s[i]
            res = 1
        } else {
            str += s[i]
            res += 1;

        }
    }
    // console.log(res)
    return res > l ? res : l;
};
console.log(lengthOfLongestSubstring("aukukuuudd"));
var dict = [
    { operTitle: "棉被", oper: "roller_1_2" },
    { operTitle: "水肥", oper: "3" },
    { operTitle: "臭氧", oper: "4" }
];
function finder(key) {
    var array = dict.filter(function (item) {
        return item.oper === key;
    })
    return array[0]['operTitle'];
}
console.log(finder('roller_1_2'));