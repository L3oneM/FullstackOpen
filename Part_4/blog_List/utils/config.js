/* eslint-disable no-undef */
require('dotenv').config()

// eslint-disable-next-line no-undef
let PORT = process.env.PORT
let MONGODB_URI = process.env.MONGODB_URI

module.exports = {
  MONGODB_URI,
  PORT
}