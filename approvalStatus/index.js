/* 
    Called whenever a new Travel/Training request is modified.
    Checks the modified record for:
    final approval (days only),
    final approval (full),
    or rejection.

    Then, emails the relevant parties with notice of completion

    @param {req.query.itemID} number
    @param {req.query.createdBy} string - User's email address
*/

const fetch = require("node-fetch");
const fs = require("fs");
const getTravelTraining = require("../shared/functions/getTravelTraining");
const sendEmail = require("../shared/functions/sendEmail");
require("../shared/functions/stringFormat");
global.Headers = fetch.Headers;

module.exports = async (context, req) => {
  // return confirmation immediately
  context.res = {
    status: 202
  };

  const itemID = req.query.itemID;
  const createdBy = req.query.createdBy;
  const df = "mm/dd/yyyy";

  // first, get Travel/Training req
  const tt = await getTravelTraining(itemID);

  // check for completion
  if (tt.finalApproval == "Yes" && tt.daysOnly != "Yes") {
    fullApproval();
  } else if (tt.finalApproval == "Yes" && tt.daysOnly == "Yes") {
    daysOnly();
  } else if (tt.finalDenial == "Yes") {
    rejection();
  }

  // send necessary emails
  async function fullApproval() {
    // email approvers
    let approvers = {
      to: [
        tt.firstForward,
        tt.secondForward,
        tt.thirdForward,
        tt.fourthForward,
        tt.fifthForward,
        tt.finalForward
      ],
      from: {
        email: createdBy,
        name: "Travel/Training Requests"
      },
      subject: "Training/Travel Approved"
    };
    const path = __dirname + "//emailTemplates/fullApproval.html";
    fs.readFile(path, "utf8", async (err, data) => {
      load.html = await String.format(
        data,
        tt.officerName, // 0
        dateFormat(tt.submitted, df), // 1
        tt.amountRequested, // 2
        tt.url // 3
      );
      await sendEmail(approvers);
    });

    // then, email submitter
    let submitter = {
      to: createdBy,
      from: {
        email: createdBy,
        name: "Travel/Training Requests"
      },
      subject: "Training/Travel Approved"
    };
    const path = __dirname + "//emailTemplates/fullApprovalSubmitter.html";
    fs.readFile(path, "utf8", async (err, data) => {
      load.html = await String.format(
        data,
        tt.officerName, // 0
        dateFormat(tt.submitted, df), // 1
        tt.amountRequested, // 2
        tt.url // 3
      );
      await sendEmail(submitter);
    });
  }

  async function daysOnly() {
    // email approvers
    let approvers = {
      to: [
        tt.firstForward,
        tt.secondForward,
        tt.thirdForward,
        tt.fourthForward,
        tt.fifthForward,
        tt.finalForward
      ],
      from: {
        email: createdBy,
        name: "Travel/Training Requests"
      },
      subject: "Training/Travel Approved"
    };
    const path = __dirname + "//emailTemplates/daysOnly.html";
    fs.readFile(path, "utf8", async (err, data) => {
      load.html = await String.format(
        data,
        tt.officerName, // 0
        dateFormat(tt.submitted, df), // 1
        tt.url // 2
      );
      await sendEmail(approvers);
    });

    // then, email submitter
    let submitter = {
      to: createdBy,
      from: {
        email: createdBy,
        name: "Travel/Training Requests"
      },
      subject: "Training/Travel Approved"
    };
    const path = __dirname + "//emailTemplates/daysOnlySubmitter.html";
    fs.readFile(path, "utf8", async (err, data) => {
      load.html = await String.format(
        data,
        tt.officerName, // 0
        dateFormat(tt.submitted, df), // 1
        tt.url // 2
      );
      await sendEmail(submitter);
    });
  }

  async function rejection() {
    // email approvers
    let approvers = {
      to: [
        tt.firstForward,
        tt.secondForward,
        tt.thirdForward,
        tt.fourthForward,
        tt.fifthForward,
        tt.finalForward
      ],
      from: {
        email: createdBy,
        name: "Travel/Training Requests"
      },
      subject: "Training/Travel Rejected"
    };
    const path = __dirname + "//emailTemplates/rejected.html";
    fs.readFile(path, "utf8", async (err, data) => {
      load.html = await String.format(
        data,
        tt.officerName, // 0
        dateFormat(tt.submitted, df), // 1
        tt.url // 2
      );
      await sendEmail(approvers);
    });

    // then, email submitter
    let submitter = {
      to: createdBy,
      from: {
        email: createdBy,
        name: "Travel/Training Requests"
      },
      subject: "Training/Travel Rejected"
    };
    const path = __dirname + "//emailTemplates/rejectedSubmitter.html";
    fs.readFile(path, "utf8", async (err, data) => {
      load.html = await String.format(
        data,
        tt.officerName, // 0
        dateFormat(tt.submitted, df), // 1
        tt.url // 2
      );
      await sendEmail(submitter);
    });
  }
};
