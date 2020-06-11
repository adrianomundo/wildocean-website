const sqlDbFactory = require("knex");

let { personDbSetup } = require("./PersonService");
let { serviceDbSetup } = require("./ServicesService");
let { servicePersonDbSetup } = require("./ServicesService");
let { eventDbSetup } = require("./EventsService");
let { testimonialDbSetup } = require("./TestimonialsService");
let { textDbSetup } = require("./TextService");

let sqlDb = sqlDbFactory({
  client: "pg",
  debug: true,
  connection: process.env.DATABASE_URL,
  ssl: true
});

function setupDataLayer() {
  console.log("Setting up Data Layer");
  console.log(process.env.DATABASE_URL);
  return personDbSetup(sqlDb) && serviceDbSetup(sqlDb) && servicePersonDbSetup(sqlDb) && eventDbSetup(sqlDb) && testimonialDbSetup(sqlDb) && textDbSetup(sqlDb);
}

module.exports = { database: sqlDb, setupDataLayer };