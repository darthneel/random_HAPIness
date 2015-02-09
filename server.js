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
	path: '/random',
	handler: function(req, res){
		request('http://api.randomuser.me/', function(error, response, body){
			console.log(body);
		})
		res('Hit random');
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