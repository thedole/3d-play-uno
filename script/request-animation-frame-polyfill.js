module.exports = function (ns) {
    var lastTime = 0,
    	vendors = ['ms', 'moz', 'webkit', 'o'],
    	x;

    ns = ns || {};
    for (x = 0; x < vendors.length && !ns.requestAnimationFrame; ++x) {
        ns.requestAnimationFrame = ns[vendors[x]+'RequestAnimationFrame'];
        ns.cancelRequestAnimationFrame = ns[vendors[x]+
          'CancelRequestAnimationFrame'];
    }

    if (!ns.requestAnimationFrame)
        ns.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = ns.setTimeout(function() { callback(currTime + timeToCall); },
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!ns.cancelAnimationFrame)
        ns.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
    return ns;
};
