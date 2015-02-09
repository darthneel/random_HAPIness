var Hapi = require('hapi');
var Request = require('request');
var Good = require('good');
var fs = require('fs');

var server = new Hapi.Server();
server.connection({port: 3000});

server.route({
	method: "GET",
	path: "/",
	handler: function(req, res){
		// var html = fs.readFileSync('./views/index.html');
		res.file('./views/index.html');
	}
});

server.route({
	method: "GET",
	path: '/random',
	handler: function(req, res){
		Request('http://api.randomuser.me/', function(error, response, body){
			console.log(body);
		})
		res('Hit random');
	}
});

server.route({
  path: "/static/{path*}",
  method: "GET",
  handler: {
    directory: {
      path: "./public",
      listing: false,
      index: false
    }
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