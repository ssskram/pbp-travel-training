/* 
    Called whenever a new Travel/Training request is submitted, or is modified.
    Sends an email to the relevant approver at the appropriate place in the workflow.

    @param {req.query.itemID} number
    @param {req.query.createdBy} string - User's email address
*/

const fetch = require("node-fetch");
const fs = require("fs");
const dateFormat = require("dateformat");
const getTravelTraining = require("../shared/getTravelTraining");
const sendEmail = require("../shared/sendEmail");
const setLastNotice = require("../shared/setLastNotice");
require("../shared/stringFormat");
global.Headers = fetch.Headers;

module.exports = async (context, req) => {
  // return confirmation immediately
  context.res = {
    status: 202
  };

  const itemID = req.query.itemID;
  const createdBy = req.query.createdBy;
  const now = new Date();
  const df = "mm/dd/yyyy";

  // first, get Travel/Training req
  const tt = await getTravelTraining(itemID);

  // calculate current position of workflow approval
  // send email to current approver
  // set LastNotice to current datetime
  if (tt.finalForward != null && tt.finalApprovalSignature == null) {
    console.log("Final approver");
    se(tt.finalForward);
    setLastNotice(itemID, now);
  } else if (tt.fifthForward != null && tt.fifthApprovalSignature == null) {
    console.log("Fifth approver");
    se(tt.fifthForward);
    setLastNotice(itemID, now);
  } else if (tt.fourthForward != null && tt.fourthApprovalSignature == null) {
    console.log("Fourth approver");
    se(tt.fourthForward);
    setLastNotice(itemID, now);
  } else if (tt.thirdForward != null && tt.thirdApprovalSignature == null) {
    console.log("Third approver");
    se(tt.thirdForward);
    setLastNotice(itemID, now);
  } else if (tt.secondForward != null && tt.secondApprovalSignature == null) {
    console.log("Second approver");
    se(tt.secondForward);
    setLastNotice(itemID, now);
  } else if (tt.firstForward != null && tt.firstApprovalSignature == null) {
    console.log("First approver");
    se(tt.firstForward);
    setLastNotice(itemID, now);
  }

  async function se(emailAddress) {
    let load = {
      to: emailAddress,
      from: {
        email: emailAddress,
        name: "Travel/Training Requests"
      },
      subject: "This form needs your approval"
    };

    // read in email template, populate with data, and send
    const path = __dirname + "//emailTemplate/approvalNeeded.html";
    fs.readFile(path, "utf8", async (err, data) => {
      load.html = await String.format(
        data,
        tt.officerName, // 0
        dateFormat(tt.submitted, df), // 1
        tt.url // 2
      );
      await sendEmail(load);
    });
  }
};
