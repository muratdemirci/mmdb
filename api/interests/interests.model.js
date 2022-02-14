const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
    fingerPrint: { type: String, unique: true, required: true},
    urlPaths: [
        {
            type: {
                type: String,
                required : true,
                lowercase: true,
            },
            path: {
                type: String,
                required : true,
                lowercase: true,
            }
        }
    ]
})

module.exports = mongoose.model('Interests', schema)