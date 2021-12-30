const express = require('express')
const cors = require('cors')
//jwt

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended : false}))
app.use(cors())

app.listen(5000,() => {
    console.log('Server is listening on port 5000...');
})