'use strict';

let sqlDb;

exports.serviceDbSetup = function(database) {
  sqlDb = database
  console.log("Check if service table exists");
  return sqlDb.schema.hasTable("service").then(exists => {
    if (!exists) {
      console.log("The table SERVICE does not exist, creating it");
      let serviceJson = require('../utils/service.json');
      return sqlDb.schema.createTable("service", table => {
        table.string("title").notNullable().unique();
        table.text("long_description").notNullable();
        table.text("short_description").notNullable();
        table.text("img").notNullable();
        table.text("practical_info").notNullable();
        table.integer("event_id").references("event.event_id").onUpdate("CASCADE").onDelete("CASCADE");
        table.primary(["title"]);
      }).then( () => { return sqlDb("service").insert(serviceJson);
      });
    }
    else {
      console.log("SERVICE Table already exists");
    }
  });
};

exports.servicePersonDbSetup = function(database) {
  sqlDb = database
  console.log("Check if service_person table exists");
  let servicePersonJson = require('../utils/service_person.json');
  return sqlDb.schema.hasTable("service_person").then(exists => {
    if (!exists) {
      console.log("The table SERVICE_PERSON does not exist, creating it");
      return sqlDb.schema.createTable("service_person", table => {
        table.string("title").references("service.title").onUpdate("CASCADE").onDelete("CASCADE");
        table.integer("matricola").references("person.matricola").onUpdate("CASCADE").onDelete("CASCADE");
        table.primary(["title", "matricola"]);
      }).then( () => { return sqlDb("service").insert(servicePersonJson);
      });
    }
    else {
      console.log("SERVICE_PERSON table already exists");
    }
  });
};

/**
 * get the event related to the service
 * returns the event which is presented in the service filtered by tht title
 *
 * title String title of the service to find
 * returns Object
 **/
exports.getEventbyService = function(title) {

};


/**
 * get the people related to the service
 * returns all the people who are involved in the service filtered by tht title
 *
 * title String title of the service to find
 * returns List
 **/
exports.getPeoplebyService = function(title) {

}


/**
 * get the service by title
 * returns a service filtered by its title
 *
 * title String title of the service to find
 * returns Object
 **/
exports.getServicebyTitle = function(title) {

};


/**
 * get all the services available of the association
 * returns all the services offered by the association
 *
 * limit Integer maximum number of items per page (optional)
 * offset Integer pagination offset, default is 0 (optional)
 * returns List
 **/
exports.getServices = function(limit, offset) {

};

