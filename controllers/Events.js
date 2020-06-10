'use strict';

var utils = require('../utils/writer.js');
var Events = require('../service/EventsService');

module.exports.getEventbyId = function getEventbyId (req, res, next) {
  var eventId = req.swagger.params['eventId'].value;
  Events.getEventbyId(eventId)
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

module.exports.getPersonOfEvent = function getPersonOfEvent (req, res, next) {
  var eventId = req.swagger.params['eventId'].value;
  Events.getPersonOfEvent(eventId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getServiceOfEvent = function getServiceOfEvent (req, res, next) {
  var eventId = req.swagger.params['eventId'].value;
  Events.getServiceOfEvent(eventId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
