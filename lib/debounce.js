function debounce(func, wait, im) {
    var timer;
    wait = wait || 300;
    im = im || false;
    return function () {
        var ct = this, args = arguments;
        if (timer) { window.clearTimeout(timer); }
        if (im) {
            var done = !timer;
            if (done) {
                func.apply(ct, args);
            }
            timer = setTimeout(function () {
                timer = null;
            }, wait);
        } else {
            timer = setTimeout(function () {
                func.apply(ct, args);
            }, wait);
            console.log('con');
        }
    };
}