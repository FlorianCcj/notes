var ip = require("ip");
var restify = require("restify");

var server = restify.createServer({name: 'demo'});
var message = process.env.message || 'hello, world';

server.get('/', function(req, res, next) {
    res.send(200, message + ' ' + ip.address() + '!');
    return next();
});

server.listen(+(process.env.DEMO_API_PORT || '9000'));
