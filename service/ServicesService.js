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
        table.increments("service_id").notNullable().unique();
        table.string("title").notNullable();
        table.text("long_description").notNullable();
        table.text("short_description").notNullable();
        table.string("img").notNullable();
        table.text("practical_info").notNullable();
        table.integer("event_id").references("event.event_id");
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
        table.integer("service_id").references("service.service_id").onUpdate("CASCADE").onDelete("CASCADE").notNullable();
        table.integer("matricola").references("person.matricola").onUpdate("CASCADE").onDelete("CASCADE").notNullable();
        table.primary(["service_id", "matricola"]);
      }).then( () => { return sqlDb("service_person").insert(servicePersonJson);
      });
    }
    else {
      console.log("SERVICE_PERSON table already exists");
    }
  });
};

exports.serviceImgDbSetup = function(database) {
  sqlDb = database
  console.log("Check if service_img table exists");
  let serviceImgJson = require('../utils/service_img.json');
  return sqlDb.schema.hasTable("service_img").then(exists => {
    if (!exists) {
      console.log("The table SERVICE_IMG does not exist, creating it");
      return sqlDb.schema.createTable("service_img", table => {
        table.integer("service_id").references("service.service_id").onUpdate("CASCADE").onDelete("CASCADE").notNullable();
        table.string("imgpath").notNullable();
        table.primary(["service_id", "imgpath"]);
      }).then( () => { return sqlDb("service_img").insert(serviceImgJson);
      });
    }
    else {
      console.log("SERVICE_IMG table already exists");
    }
  });
};

/**
 * get the event related to the service
 * returns the event which is presented in the service filtered by service ID
 *
 * service_id String ID of the service to find
 * returns Event
 **/
exports.getEventbyService = function(service_id) {

};


/**
 * get the people related to the service
 * returns all the people who are involved in the service filtered by service ID
 *
 * service_id String ID of the service to find
 * returns List
 **/
exports.getPeoplebyService = function(service_id) {

}


/**
 * get the service by its ID
 * returns a service filtered by its ID
 *
 * service_id String ID of the service to find
 * returns Service
 **/
exports.getServicebyId = function(service_id) {

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

