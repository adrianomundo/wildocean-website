'use strict';

var utils = require('../utils/writer.js');
var Person = require('../service/PersonService');

module.exports.getEventbyPerson = function getEventbyPerson (req, res, next) {
  var matricola = req.swagger.params['matricola'].value;
  Person.getEventbyPerson(matricola)
      .then(function (response) {
        utils.writeJson(res, response);
      })
      .catch(function (response) {
        utils.writeJson(res, response);
      });
};

module.exports.getPeople = function getPeople (req, res, next) {
  var limit = req.swagger.params['limit'].value;
  var offset = req.swagger.params['offset'].value;
  Person.getPeople(limit,offset)
      .then(function (response) {
        utils.writeJson(res, response);
      })
      .catch(function (response) {
        utils.writeJson(res, response);
      });
};

module.exports.getPersonbyMatricola = function getPersonbyMatricola (req, res, next) {
  var matricola = req.swagger.params['matricola'].value;
  Person.getPersonbyMatricola(matricola)
      .then(function (response) {
        utils.writeJson(res, response);
      })
      .catch(function (response) {
        utils.writeJson(res, response);
      });
};

module.exports.getServicesbyPerson = function getServicesbyPerson (req, res, next) {
  var matricola = req.swagger.params['matricola'].value;
  Person.getServicesbyPerson(matricola)
      .then(function (response) {
        utils.writeJson(res, response);
      })
      .catch(function (response) {
        utils.writeJson(res, response);
      });
};
