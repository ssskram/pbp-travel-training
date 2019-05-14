/* 
    Called by a cron running behind every submitted Travel/Training request.
    Called if workflow is not complete, and the last notice was sent more than 2 days ago. 
    If so, sends a reminder to the relevant approver.

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
  if (tt.finalApprovalSignature == null && tt.finalApprovalSignature != null) {
    console.log("Final approver reminder");
    requestApproval(tt.finalForward);
    setLastNotice(itemID, now);
  } else if (tt.fifthApprovalSignature == null && tt.fourthApprovalSignature != null) {
    console.log("Fifth approver reminder");
    requestApproval(tt.fifthForward);
    setLastNotice(itemID, now);
  } else if (tt.fourthApprovalSignature == null && tt.thirdApprovalSignature != null) {
    console.log("Fourth approver reminder");
    requestApproval(tt.fourthForward);
    setLastNotice(itemID, now);
  } else if (tt.thirdApprovalSignature == null && tt.secondApprovalSignature != null) {
    console.log("Third approver reminder");
    requestApproval(tt.thirdForward);
    setLastNotice(itemID, now);
  } else if (tt.secondApprovalSignature == null && tt.firstApprovalSignature != null) {
    console.log("Second approver reminder");
    requestApproval(tt.secondForward);
    setLastNotice(itemID, now);
  } else if (tt.firstApprovalSignature == null && tt.officerSignature != null) {
    console.log("First approver reminder");
    requestApproval(tt.firstForward);
    setLastNotice(itemID, now);
  }
};
