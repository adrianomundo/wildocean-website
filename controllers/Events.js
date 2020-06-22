'use strict';

var utils = require('../utils/writer.js');
var Events = require('../service/EventsService');

module.exports.getEventbyId = function getEventbyId (req, res, next) {
  var event_id = req.swagger.params['event_id'].value;
  Events.getEventbyId(event_id)
      .then(function (response) {
        utils.writeJson(res, response);
      })
      .catch(function (response) {
        utils.writeJson(res, response);
      });
};

module.exports.getEvents = function getEvents (req, res, next) {
  var limit = req.swagger.params['limit'].value;
  var offset = req.swagger.params['offset'].value;
  Events.getEvents(limit,offset)
      .then(function (response) {
        utils.writeJson(res, response);
      })
      .catch(function (response) {
        utils.writeJson(res, response);
      });
};

module.exports.getPersonByEvent = function getPersonByEvent (req, res, next) {
  var event_id = req.swagger.params['event_id'].value;
  Events.getPersonByEvent(event_id)
      .then(function (response) {
        utils.writeJson(res, response);
      })
      .catch(function (response) {
        utils.writeJson(res, response);
      });
};

module.exports.getServiceByEvent = function getServiceByEvent (req, res, next) {
  var event_id = req.swagger.params['event_id'].value;
  Events.getServiceByEvent(event_id)
      .then(function (response) {
        utils.writeJson(res, response);
      })
      .catch(function (response) {
        utils.writeJson(res, response);
      });
};