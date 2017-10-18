const mongoose = require('mongoose')
const Schema = mongoose.Schema

const journalSchema = new Schema({
    date: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    notes: {
        type: String,
        required: true
    },
    privacy: {
        type: String,
        required: true
    },
    category: {
        type: String
    }

})

// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('journal', journalSchema)
