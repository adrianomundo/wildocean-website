'use strict';

let { setupDataLayer } = require("./service/DataLayer");

var fs = require('fs'),
    path = require('path'),
    http = require('http');

var app = require('connect')();
var swaggerTools = require('swagger-tools');
var jsyaml = require('js-yaml');
var serverPort = process.env.PORT || 8080;

let serveStatic = require("serve-static");


// swaggerRouter configuration
var options = {
  swaggerUi: path.join(__dirname, '/swagger.json'),
  controllers: path.join(__dirname, './controllers'),
  useStubs: process.env.NODE_ENV === 'development' // Conditionally turn on stubs (mock mode)
};

// The Swagger document (require it, build it programmatically, fetch it from a URL, ...)
var spec = fs.readFileSync(path.join(__dirname,'api/swagger.yaml'), 'utf8');
var swaggerDoc = jsyaml.safeLoad(spec);

// Initialize the Swagger middleware
swaggerTools.initializeMiddleware(swaggerDoc, function (middleware) {

  // Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
  app.use(middleware.swaggerMetadata());

  // Validate Swagger requests
  app.use(middleware.swaggerValidator());

  // Route validated requests to appropriate controller
  app.use(middleware.swaggerRouter(options));

  // Serve the Swagger documents and Swagger UI
  app.use(middleware.swaggerUi());

  // Serve the static assets 
  app.use(serveStatic(__dirname + "/public"));

  // Set a redirect from backend swagger ui to docs
  app.use('/backend/swaggerui', function redirect(req, res, next) {
      res.writeHead(301, {Location: "/docs"});
      res.end();
  });

  // Set the cross origin
  app.use(function(req, res, next) {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    });


  // Start the server
  setupDataLayer().then(() => {
      http.createServer(app).listen(serverPort, function() {
          console.log('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
          console.log('Swagger-ui is available on http://localhost:%d/docs', serverPort);
      });
  });

});
