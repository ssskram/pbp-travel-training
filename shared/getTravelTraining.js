const fetch = require("node-fetch");

async function getTravelTraining(itemID) {
  const call = await fetch(
    "https://365proxy.azurewebsites.us/travelTrainings/item?itemID=" +
      itemID +
      "&key=" +
      process.env.PROXY,
    {
      method: "get"
    }
  );
  const item = await call.json();
  return item;
}

module.exports = getTravelTraining