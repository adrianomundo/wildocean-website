'use strict';

const {respondWithCode} = require("../utils/writer");
let sqlDb;

exports.personDbSetup = function(database) {
  sqlDb = database
  console.log("Check if person table exists");
  return sqlDb.schema.hasTable("person").then( exists => {
    if (!exists) {
      console.log("The table PERSON does not exist, creating it");
      let personJson = require('../utils/person.json')
      return sqlDb.schema.createTable("person", table => {
        table.increments("matricola").unique().notNullable();
        table.string("name").notNullable();
        table.string("surname").notNullable();
        table.text("description").notNullable();
        table.string("img").notNullable();
        table.string("role");
        table.string("phone");
        table.string("mail");
        table.string("nationality");
        table.integer("event_id").references("event.event_id");
      }).then( () => { return sqlDb("person").insert(personJson);
      });
    }
    else {
      console.log("PERSON table already exists");
    }
  });
};

/**
 * get the event organized by a person
 * returns the event organized by the person retrieved from the matricola code
 *
 * matricola Long matricola  of the person to return
 * returns Event
 **/
exports.getEventbyPerson = function(matricola) {
  let event =  sqlDb.select("event_id").from("person").where("matricola", matricola);
  return sqlDb.select().table("event").where("event_id", event);
};


/**
 * get all the people available in the association
 * returns all the people involved in the association
 *
 * limit Integer maximum number of items per page (optional)
 * offset Integer pagination offset, default is 0 (optional)
 * returns List
 **/
exports.getPeople = function(limit,offset) {
  if (!offset) offset = 0;
  return sqlDb.select().table("person").limit(limit).offset(offset);

};


/**
 * get a person by matricola code
 * returns a single person filtered by its matricola code
 *
 * matricola Long matricola  of the person to return
 * returns Person
 **/
exports.getPersonbyMatricola = function(matricola) {
  return sqlDb.select().table("person").where("matricola", matricola);
};


/**
 * get the services organized by a person
 * returns a list of services organized by the person retrieved from the matricola code
 *
 * matricola Long matricola of the person to return
 * returns List
 **/
exports.getServicesbyPerson = async function(matricola) {
  let services = sqlDb.select("service_id").from("service_person").where("matricola", matricola);
  return sqlDb.select().from("service").whereIn("service_id", services);

};

