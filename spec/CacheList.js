var util = require('util');
var AsyncMap = require('../spec/AsyncMap');
var Promise = require('rsvp').Promise;
util.inherits(CacheList, AsyncMap);

module.exports = CacheList;

function CacheList() {
    AsyncMap.call(this);
}

CacheList.prototype.ready = function () {
    return Promise.all(this._list.map(function (cache) {
        return cache.ready();
    }));
};

CacheList.prototype.match = function (url) {
    return Promise.all(this._list.map(function (cache) {
        return cache.match(url);
    })).then(function (matches) {
        return matches[0];
    });
};