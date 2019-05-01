const fetch = require("node-fetch");

async function sendEmail(load) {
  await fetch("https://sendgridproxy.azurewebsites.us/sendMail/single", {
    method: "POST",
    body: JSON.stringify(load),
    headers: new Headers({
      Authorization: "Bearer " + process.env.SENDGRID,
      "Content-type": "application/json"
    })
  });
}

module.exports = sendEmail;
