const mongoose = require('mongoose')

const newSchema = mongoose.Schema

const noteSchema = newSchema({
    title: {
        type: String,
        required: [true, 'Fill in the Title']
    },
    explanation: {
        type: String,
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Note', noteSchema)