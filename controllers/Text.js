'use strict';

var utils = require('../utils/writer.js');
var Text = require('../service/TextService');

module.exports.getTextOfPage = function getTextOfPage (req, res, next) {
  var page = req.swagger.params['page'].value;
  Text.getTextOfPage(page)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getTexts = function getTexts (req, res, next) {
  var limit = req.swagger.params['limit'].value;
  var offset = req.swagger.params['offset'].value;
  Text.getTexts(limit,offset)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
