'use strict';

var utils = require('../utils/writer.js');
var Testimonials = require('../service/TestimonialsService');

module.exports.getTestimonials = function getTestimonials (req, res, next) {
  var limit = req.swagger.params['limit'].value;
  var offset = req.swagger.params['offset'].value;
  Testimonials.getTestimonials(limit,offset)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
