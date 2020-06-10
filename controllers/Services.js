'use strict';

var utils = require('../utils/writer.js');
var Services = require('../service/ServicesService');

module.exports.getEventbyService = function getEventbyService (req, res, next) {
  var title = req.swagger.params['title'].value;
  Services.getEventbyService(title)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getPeoplebyService = function getPeoplebyService (req, res, next) {
  var title = req.swagger.params['title'].value;
  Services.getPeoplebyService(title)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getServicebyTitle = function getServicebyTitle (req, res, next) {
  var title = req.swagger.params['title'].value;
  Services.getServicebyTitle(title)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getServices = function getServices (req, res, next) {
  var limit = req.swagger.params['limit'].value;
  var offset = req.swagger.params['offset'].value;
  Services.getServices(limit,offset)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
