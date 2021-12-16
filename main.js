var http = require("http");

const redis = require("redis");
const client = redis.createClient(process.env.REDIS_PORT, process.env.REDIS_HOST, {auth_pass: process.env.REDIS_PASSWORD, tls: {servername: process.env.REDIS_HOST}});
let result = "";

client.set("foo_rand000000000000", "arun");

// This will return a JavaScript String
client.get("foo_rand000000000000", function(err, reply) {
  result = reply.toString();
  console.log(reply.toString()); // Will print `OK`
});


http.createServer(function (request, response) {
   // Send the HTTP header 
   // HTTP Status: 200 : OK
   // Content Type: text/plain
   response.writeHead(200, {'Content-Type': 'text/plain'});
   
   // Send the response body as "Hello World"
   response.end(result);
}).listen(8080);

// Console will print the message
console.log('Server running at http://127.0.0.1:8080/');
