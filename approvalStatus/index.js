/* 
    Called whenever a new Travel/Training request is modified.
    Checks the modified record for:
    final approval (days only),
    final approval (full),
    or rejection.

    Then, emails the relevant parties with necessary information

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

    // check for completion

    // send necessary emails

}