const fetch = require("node-fetch");

async function getTravelTraining(itemID) {
  // const call = await fetch(
  //   "https://365proxy.azurewebsites.us/travelTrainings/item?itemID=" +
  //     itemID +
  //     "&key=" +
  //     process.env.PROXY,
  //   {
  //     method: "get"
  //   }
  // );
  // const item = await call.json();
  // return item;

  return {
    id: 2000,
    url:
      "https://cityofpittsburgh.sharepoint.com/sites/Police/_layouts/15/FormServer.aspx?XmlLocation=/sites/Police/TravelTraining/TravelTraining_Linda Barone_2017-10-11T16_04_50.xml&ClientInstalled=false&DefaultItemOpen=1&Source=https%3A%2F%2Fcityofpittsburgh%2Esharepoint%2Ecom%2Fsites%2FPolice%2FTravelTraining%2FForms%2FAllItems%2Easpx",
    officerName: "Steven Schultze",
    officerSignature: "Stevey Schultze",
    trainingRequested: "Major Cities Technology Committee",
    startDate: "2019-10-18T04:00:00Z",
    endDate: "2019-10-20T04:00:00Z",
    submitted: "2019-04-11T20:04:51Z",
    amountRequested: "$1077.45",
    firstForward: "paul.marks@pittsburghpa.gov",
    firstApprovalSignature: "Paul Marks",
    secondForward: "paulmarks211@gmail.com",
    secondApprovalSignature: null,
    thirdForward: null,
    thirdApprovalSignature: null,
    fourthForward: null,
    fourthApprovalSignature: null,
    fifthForward: null,
    fifthApprovalSignature: null,
    finalForward: null,
    finalApprovalSignature: null,
    lastNotice: "2017-11-06T05:00:00Z",
    finalDenial: null,
    finalApproval: null,
    daysOnly: null
  };
}

module.exports = getTravelTraining;
