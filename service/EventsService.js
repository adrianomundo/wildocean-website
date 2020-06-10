'use strict';

let sqlDb;

exports.eventDbSetup = function(database) {
  sqlDb = database
  console.log("Check if event table exists");
  return sqlDb.schema.hasTable("event").then(exists => {
    if (!exists) {
      console.log("The table EVENT does not exist, creating it");
      return sqlDb.schema.createTable("event", table => {
        table.increments("event_id");
        table.string("title").notNullable();
        table.string("location").notNullable();
        table.text("long_description").notNullable();
        table.text("short_description").notNullable();
        table.text("img").notNullable();
        table.time("start_h").notNullable();
        table.time("end_h").notNullable();
        table.date("date").notNullable();
        table.string("phone");
      });
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
exports.getEventbyId = function(eventId) {


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

};


/**
 * get the organizer of the event
 * returns the person in charge of organizing the event filtered by its ID
 *
 * eventId Long ID of the event to find
 * returns Object
 **/
exports.getPersonOfEvent = function(eventId) {

};


/**
 * get the service associated with the event
 * returns the service related to the event filtered by its ID
 *
 * eventId Long ID of the event to find
 * returns Object
 **/
exports.getServiceOfEvent = function(eventId) {

};
