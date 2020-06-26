'use strict';

let sqlDb;

exports.eventDbSetup = function(database) {
  sqlDb = database
  console.log("Check if event table exists");
  return sqlDb.schema.hasTable("event").then(exists => {
    if (!exists) {
      console.log("The table EVENT does not exist, creating it");
      let eventJson = require('../utils/event.json');
      return sqlDb.schema.createTable("event", table => {
        table.increments("event_id").unique().notNullable();
        table.string("title").notNullable();
        table.string("location").notNullable();
        table.text("long_description").notNullable();
        table.text("short_description").notNullable();
        table.string("img").notNullable();
        table.time("start_h").notNullable();
        table.time("end_h").notNullable();
        table.date("date").notNullable();
        table.string("phone");
      }).then( () => { return sqlDb("event").insert(eventJson);
      });
    }
    else {
      console.log("EVENT Table already exists");
    }
  });
};


/**
 * get the event by ID
 * returns the event filtered by its ID
 *
 * eventId Long ID of the event to find
 * returns Object
 **/
exports.getEventbyId = function(event_id) {
  return sqlDb.select().table("event").where("event_id", event_id);
};


/**
 * get all the events organized by the association
 * returns a list of all the events organized by the association
 *
 * limit Integer maximum number of items per page (optional)
 * offset Integer pagination offset, default is 0 (optional)
 * returns List
 **/
exports.getEvents = function(limit, offset) {
  return sqlDb.select().table("event");
};


/**
 * get the organizer of the event
 * returns the person in charge of organizing the event filtered by its ID
 *
 * event_id Long ID of the event to find
 * returns Person
 **/
exports.getPersonByEvent = function(event_id) {
  return sqlDb.select().table("person").where("event_id", event_id);
};


/**
 * get the service associated with the event
 * returns the service related to the event filtered by its ID
 *
 * event_id Long ID of the event to find
 * returns Service
 **/
exports.getServiceByEvent = async function(event_id) {
  // TODO sistemare query per far tornare la lista delle img
  //return sqlDb.select().table("service").where("event_id", event_id);
  let service = await sqlDb.select().table("service").where("event_id", event_id);
  let service_id = service[0].service_id;
  let images = await sqlDb.select("imgpath").from("service_img").where("service_id", service_id);
  let imgArray = [];
  for (let i = 0; i < images.length; i++) {
    imgArray.push(images[i].imgpath);
  }
  service[0].img = imgArray;
  return service;
};
