'use strict';

let sqlDb;

exports.serviceDbSetup = function(database) {
  sqlDb = database
  console.log("Check if service table exists");
  return sqlDb.schema.hasTable("service").then(exists => {
    if (!exists) {
      console.log("The table SERVICE does not exist, creating it");
      return sqlDb.schema.createTable("service", table => {
        table.string("title");
        table.text("long_description").notNullable();
        table.text("short_description").notNullable();
        table.text("img").notNullable();
        table.text("practical_info").notNullable();
        table.integer("event_id").references("event.event_id").onUpdate("CASCADE").onDelete("CASCADE");
        table.primary(["title"]);
      });
    }
  });
};

exports.servicePersonDbSetup = function(database) {
  sqlDb = database
  console.log("Check if service_person table exists");
  return sqlDb.schema.hasTable("service_person").then(exists => {
    if (!exists) {
      console.log("The table SERVICE_PERSON does not exist, creating it");
      return sqlDb.schema.createTable("service_person", table => {
        table.string("title").references("service.title").onUpdate("CASCADE").onDelete("CASCADE");
        table.integer("matricola").references("person.title").onUpdate("CASCADE").onDelete("CASCADE");
        table.primary(["title", "matricola"]);
      });
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

