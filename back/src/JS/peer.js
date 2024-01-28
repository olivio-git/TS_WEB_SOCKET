const SimplePeer = require('simple-peer');
const wrtc = require('@koush/wrtc');

function createPeer(options) {
 return new SimplePeer({ ...options, wrtc });
}

module.exports = createPeer;