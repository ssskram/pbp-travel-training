/* 
    Called by a cron running behind every submitted Travel/Training request.
    Finds the minutes between the last notice and now. 
    If last notice was more than two days ago, then send reminder email to relevant approver.

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

    // calculate time since last notice

    // if last notice > two days ago, send a reminder

}