var util = require('util');
var hide = require('hide-key');
var _instanceOf = require('./_instanceOf');
var Event = require('./Event');
var Response = require('./Response');
var SameOriginResponse = require('./SameOriginResponse');
var Promise = require('rsvp').Promise;
util.inherits(MessageEvent, Event);

module.exports = MessageEvent;

function MessageEvent(data, origin) {
    Event.call(this, 'message');
    this.data = data;
    this.origin = origin;
}
