/* 
    Called whenever a new Travel/Training request is submitted.
    Sends the user a confirmation email with some relevant information about
    what they submitted.

    @param {req.query.itemID} number
    @param {req.query.createdBy} string - User's email address
*/

const fetch = require("node-fetch");
const fs = require("fs");
const dateFormat = require("dateformat");
const getTravelTraining = require("../shared/getTravelTraining");
const sendEmail = require("../shared/sendEmail");
require("../shared/stringFormat");
global.Headers = fetch.Headers;

module.exports = async (context, req) => {
  // return immediately
  context.res = {
    status: 202
  };

  const itemID = req.query.itemID;
  const createdBy = req.query.createdBy;
  const df = "mm/dd/yyyy";

  // first, get Travel/Training req
  const travelTraining = await getTravelTraining(itemID);

  // send confirmation email

  // base sendgrid load
  let load = {
    to: createdBy,
    from: {
      email: createdBy,
      name: "Travel/Training Requests",
    },
    subject: "Travel/Training Request Submitted"
  };

  // read in email template, populate with data, and send
  const path = __dirname + "//emailTemplate/confirmationEmail.html";
  fs.readFile(path, "utf8", async (err, data) => {
    load.html = await String.format(
      data,
      travelTraining.officerName, // 0
      travelTraining.trainingRequested, // 1
      dateFormat(travelTraining.startDate, df), // 2
      dateFormat(travelTraining.endDate, df), // 3
      dateFormat(travelTraining.submitted, df) // 4
    );
    await sendEmail(load);
  });
};
