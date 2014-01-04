(function (window) {
    if ('serviceWorker' in window.navigator) return;

    /**
     * Stub serviceWorker API
     */

    window.navigator.serviceWorker = {
        postMessage: bufferSwapFn()
    };

    /**
     * Utils
     */

    /**
     * Make a swappable function – a function that can be later be swapped out for another, and can
     * optionally hold state to keep track of its calls.
     *
     * You later swap the function using .swap:
     *
     *      person.sayName = swapFn();
     *
     *      ...
     *
     *      person.sayName.swap(function () {
     *          alert(this.name);
     *      });
     *
     * Optionally takes a generator function and a swapper function.
     *
     * You can use the generator to create hold some state and create a method that updates that
     * state. The function that the generator returns will be called every time the swappable
     * function is called until swap is called.
     *
     * The swapper allows you to apply the previously saved state to the function being swapped in.
     *
     * For a use of this, see the bufferSwapFn, which saves the context and arguments each time the
     * swappable function is called, and then calls the function being swapped in with each of the
     * supplied arguments.
     */
    function swapFn(generator, swapper) {
        generator = generator || function () { return function () {}; };
        var fn = generator();
        var original = fn;
        var proxy = function () {
            fn.apply(this, arguments);
        };
        proxy.swap = function (newFn) {
            if (swapper) swapper(fn, newFn);
            fn = newFn;
        };
        proxy.reset = function () {
            fn = original;
        };
        return proxy;
    }

    function bufferSwapFn() {
        var calls = [];
        return swapFn(function () {
            return function () {
                calls.push({
                    ctx: this,
                    args: [].slice.call(arguments)
                });
            }
        }, function (fn, newFn) {
            calls.forEach(function (memo, call) {
                newFn.apply(call.ctx, call.args);
            });
            calls = [];
        });
    }

}(this));