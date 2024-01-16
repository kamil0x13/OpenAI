require("dotenv").config()

const MONGODB_URL = process.env.MONGODB_URL
const mongosse = require('mongoose')

mongosse.connect(MONGODB_URL)