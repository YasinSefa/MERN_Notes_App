require('dotenv').config()

const express = require('express')
const app = express();
const PORT = process.env.PORT
const noteRoute = require('./routes/notes')

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next()
})

app.use(express.json())

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})

app.use('/api/notes', noteRoute)