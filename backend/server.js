require('dotenv').config()

const express = require('express')
const app = express();
const PORT = process.env.PORT
const noteRoute = require('./routes/notes')
const mongoose = require('mongoose')

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next()
})

app.use(express.json())



mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('DB Connected')

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    })
})
    .catch(err => {
        console.log(err)
    })

app.use('/api/notes', noteRoute)