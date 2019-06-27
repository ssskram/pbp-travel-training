const fetch = require("node-fetch");

async function setLastNotice(itemID, lastNotice) {
  console.log(itemID);
  console.log(lastNotice);
  await fetch(
    "https://365proxy.azurewebsites.us/travelTrainings/setLastNotice?itemID=" +
      itemID +
      "&lastNotice=" +
      lastNotice,
    {
      method: "POST",
      headers: new Headers({
        Authorization: "Bearer " + process.env.PROXY,
        "Content-type": "application/json"
      })
    }
  );
}

module.exports = setLastNotice;
