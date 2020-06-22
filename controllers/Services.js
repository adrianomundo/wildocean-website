'use strict';

var utils = require('../utils/writer.js');
var Services = require('../service/ServicesService');

module.exports.getEventbyService = function getEventbyService (req, res, next) {
  var service_id = req.swagger.params['service_id'].value;
  Services.getEventbyService(service_id)
      .then(function (response) {
        utils.writeJson(res, response);
      })
      .catch(function (response) {
        utils.writeJson(res, response);
      });
};

module.exports.getPeoplebyService = function getPeoplebyService (req, res, next) {
  var service_id = req.swagger.params['service_id'].value;
  Services.getPeoplebyService(service_id)
      .then(function (response) {
        utils.writeJson(res, response);
      })
      .catch(function (response) {
        utils.writeJson(res, response);
      });
};

module.exports.getServicebyId = function getServicebyId (req, res, next) {
  var service_id = req.swagger.params['service_id'].value;
  Services.getServicebyId(service_id)
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

