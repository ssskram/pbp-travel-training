const fs = require("fs");
const sendEmail = require("./sendEmail");
require("./stringFormat");

async function requestApproval(emailAddress) {
  const df = "mm/dd/yyyy";
  let load = {
    to: emailAddress,
    from: {
      email: emailAddress,
      name: "Travel/Training Requests"
    },
    subject: "This form needs your approval"
  };

  // read in email template, populate with data, and send
  const path = __dirname + "/emailTemplates/approvalNeeded.html";
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

module.exports = requestApproval;
