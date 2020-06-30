const sqlDbFactory = require("knex");

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"

let { personDbSetup } = require("./PersonService");
let { serviceDbSetup } = require("./ServicesService");
let { servicePersonDbSetup } = require("./ServicesService");
let { serviceImgDbSetup } = require("./ServicesService")
let { eventDbSetup } = require("./EventsService");
let { testimonialDbSetup } = require("./TestimonialsService");
let { textDbSetup } = require("./TextService");

let sqlDb = sqlDbFactory({
  client: "pg",
  connection: process.env.DATABASE_URL || 'postgres://gxpewqsagzalsw:509246f285e759b9580c8d5252499832b1b5ca01adce09786f94cc23eb4e78ba@ec2-54-246-87-132.eu-west-1.compute.amazonaws.com:5432/db5d7snatsbdbk?ssl=true',
  ssl: true,
});

async function setupDataLayer() {
  console.log("Setting up Data Layer");
  await eventDbSetup(sqlDb);
    await     personDbSetup(sqlDb);
         await serviceDbSetup(sqlDb);
         await servicePersonDbSetup(sqlDb);
         await serviceImgDbSetup(sqlDb);
         await testimonialDbSetup(sqlDb);
         await textDbSetup(sqlDb);
}

module.exports = { database: sqlDb, setupDataLayer };