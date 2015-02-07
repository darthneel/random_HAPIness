var Hapi = require('hapi');
var request = require('request');
var Good = require('good');

var server = new Hapi.Server();
server.connection({port: 3000});

server.route({
	method: "GET",
	path: "/",
	handler: function(req, res){
		res("Yo breh");
	}
});

server.route({
	method: "GET",
	path: '/{name}',
	handler: function(req, res){
		res('Yo ' + req.params.name);
	}
});

server.register({
    register: Good,
    options: {
        reporters: [{
            reporter: require('good-console'),
            args:[{ log: '*', response: '*' }]
        }]
    }
}, function (err) {
    if (err) {
        throw err; // something bad happened loading the plugin
    }

	server.start(function(){
		console.log("server started")
	});
});