/* 
    Called whenever a new Travel/Training request is submitted.
    Sends the user a confirmation email with some relevant information about
    what they submitted.

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

    // send confirmation email

}