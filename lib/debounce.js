function debounce(func, wait, im) {
    console.log('de')
    let timer
    wait = wait || 300
    im = im || false
    return function () {
        let ct = this, args = arguments
        if (timer) { window.clearTimeout(timer) }
        if (im) {
            let done = !timer
            if (done) {
                func.apply(ct, args)
                console.log('done');
            }
            timer = setTimeout(function () {
                timer = null
            }, wait)
            console.log('con9');
        } else {
            timer = setTimeout(function () {
                func.apply(ct, args)
            }, wait)
            console.log('con');

        }
    }
}