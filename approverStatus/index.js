/* 
    Called whenever a new Travel/Training request is submitted, or is modified.
    Sends an email to the relevant approver at the appropriate place in the workflow.

    @param {req.query.itemID} number
    @param {req.query.createdBy} string - User's email address
*/

const fetch = require('node-fetch')
const fs = require('fs')
const getTravelTraining = require('../shared/getTravelTraining')
const sendEmail = require('../shared/sendEmail')
require('../shared/stringFormat')
global.Headers = fetch.Headers

module.exports = async (context, req) => {

    // return confirmation immediately
    context.res = {
        status: 202
    }

    const itemID = req.query.itemID
    const createdBy  = req.query.createdBy

    // first, get Travel/Training req

    // calculate current position of workflow approval

    // send email to current approver

    // set LastNotice to current datetime

}