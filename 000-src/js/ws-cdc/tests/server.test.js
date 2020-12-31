const CONFIG = require("../config");
var io = require('socket.io-client');

describe('Suite of unit tests', function () {

  var socket;

  beforeEach((done) => {
    // Setup
    socket = io.connect(`http://localhost:${CONFIG.CDC_PORT}`, {
      'reconnection delay': 0,
      'reopen delay': 0,
      'force new connection': true
    });

    socket.once(`connect`, function () {
      // console.log('worked...');
      done();
    });

    socket.once('disconnect', function () {
      // console.log('disconnected...');
    });
  });
  //
  //afterEach(function () {
  afterEach((done) => {
    // Cleanup 
    if (socket && socket.connected) {
      // console.log('cleanup disconnecting...');
      socket.disconnect();
    } else {
      // There will not be a connection unless you have done() in beforeEach, socket.on('connect'...) 
      // console.log('no connection to break...');
    }
    done();
  });

  describe('test2',() => {
    it('sould do whatever', (done) => {
      socket.once(`message`, (test) => {
        expect(test).toBe('Welcome to Chat Room!');
        done();
      });
      socket.emit(`join_room`);
    });
  });
});
