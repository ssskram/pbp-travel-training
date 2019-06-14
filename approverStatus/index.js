/*
    @param {req.query.itemID} number
    @param {req.query.createdBy} string - User's email address
*/

const fetch = require("node-fetch");
const getTravelTraining = require("../shared/functions/getTravelTraining");
const setLastNotice = require("../shared/functions/setLastNotice");
const requestApproval = require("../shared//functions/requestApproval");
global.Headers = fetch.Headers;

module.exports = async (context, req) => {
  // return confirmation immediately
  context.res = {
    status: 202
  };

  const itemID = req.query.itemID;
  const createdBy = req.query.createdBy;
  const now = new Date();

  // first, get Travel/Training req
  const tt = await getTravelTraining(itemID);

  // calculate current position of workflow approval
  // send reminder email to current approver
  // set LastNotice to current datetime
  if (tt.finalForward != null && tt.finalApprovalSignature == null) {
    console.log("Final approver");
    requestApproval(tt.finalForward, tt);
    setLastNotice(itemID, now);
  } else if (tt.fifthForward != null && tt.fifthApprovalSignature == null) {
    console.log("Fifth approver");
    requestApproval(tt.fifthForward, tt);
    setLastNotice(itemID, now);
  } else if (tt.fourthForward != null && tt.fourthApprovalSignature == null) {
    console.log("Fourth approver");
    requestApproval(tt.fourthForward, tt);
    setLastNotice(itemID, now);
  } else if (tt.thirdForward != null && tt.thirdApprovalSignature == null) {
    console.log("Third approver");
    requestApproval(tt.thirdForward, tt);
    setLastNotice(itemID, now);
  } else if (tt.secondForward != null && tt.secondApprovalSignature == null) {
    console.log("Second approver");
    requestApproval(tt.secondForward, tt);
    setLastNotice(itemID, now);
  } else if (tt.firstForward != null && tt.firstApprovalSignature == null) {
    console.log("First approver");
    requestApproval(tt.firstForward, tt);
    setLastNotice(itemID, now);
  }
};
