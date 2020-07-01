'use strict';

let sqlDb;

exports.testimonialDbSetup = function(database) {
  sqlDb = database
  console.log("Check if testimonial table exists");
  return sqlDb.schema.hasTable("testimonial").then(exists => {
    if (!exists) {
      console.log("The table TESTIMONIAL does not exist, creating it");
      let testimonialJson = require('../utils/testimonial.json');
      return sqlDb.schema.createTable("testimonial", table => {
        table.string("name").notNullable();
        table.string("surname").notNullable();
        table.text("review").notNullable();
        table.primary(["name", "surname", "review"]);
      }).then(() => { return sqlDb("testimonial").insert(testimonialJson);
      });
    }
    else {
      console.log("TESTIMONIAL table already exists");
    }
  });
};

/**
 * get all the testimonials of the association
 * returns a list of all the testimonials with all the data
 *
 * limit Integer maximum number of items per page (optional)
 * offset Integer pagination offset, default is 0 (optional)
 * returns List
 **/
exports.getTestimonials = function(limit, offset) {
  if (!offset) offset = 0;
  return sqlDb.select().table("testimonial").limit(limit).offset(offset);
};

