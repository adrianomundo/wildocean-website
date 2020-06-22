'use strict';

let sqlDb;

exports.textDbSetup = function(database) {
  sqlDb = database
  console.log("Check if text table exists");
  return sqlDb.schema.hasTable("text").then(exists => {
    if (!exists) {
      console.log("The table TEXT does not exist, creating it");
      let textJson = require('../utils/text.json');
      return sqlDb.schema.createTable("text", table => {
        table.string("page").notNullable();
        table.string("section").notNullable();
        table.text("txt").notNullable();
        table.primary(["page", "section"]);
      }).then( () => { return sqlDb("text").insert(textJson);
      });
    }
    else {
      console.log("TEXT table already exists");
    }
  });
};

/**
 * get the texts of a page
 * returns a list of the texts of a page
 *
 * page String name of the page
 * returns List
 **/
exports.getTextOfPage = function(page) {
  return sqlDb.select().where("page", page);

};


/**
 * get all the texts of the website
 * returns a list of all the texts with metadata
 *
 * limit Integer maximum number of items per page (optional)
 * offset Integer pagination offset, default is 0 (optional)
 * returns List
 **/
exports.getTexts = function(limit, offset) {
  return sqlDb.select().table("text");
};

