const sqlDbFactory = require("knex");

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"

let { personDbSetup } = require("./PersonService");
let { serviceDbSetup } = require("./ServicesService");
let { servicePersonDbSetup } = require("./ServicesService");
let { eventDbSetup } = require("./EventsService");
let { testimonialDbSetup } = require("./TestimonialsService");
let { textDbSetup } = require("./TextService");

let sqlDb = sqlDbFactory({
  client: "pg",
  connection: process.env.DATABASE_URL || 'postgres://gxpewqsagzalsw:509246f285e759b9580c8d5252499832b1b5ca01adce09786f94cc23eb4e78ba@ec2-54-246-87-132.eu-west-1.compute.amazonaws.com:5432/db5d7snatsbdbk',
  ssl: true,
  debug: true
});

function setupDataLayer() {
  console.log("Setting up Data Layer");
  return personDbSetup(sqlDb) && serviceDbSetup(sqlDb) && servicePersonDbSetup(sqlDb) && eventDbSetup(sqlDb) && testimonialDbSetup(sqlDb) && textDbSetup(sqlDb);
}

module.exports = { database: sqlDb, setupDataLayer };