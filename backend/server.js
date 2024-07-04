const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const EmployeeRoute = require("./routes/employee")
const AuthRoute = require("./routes/auth")
const cors = require('cors'); // Import the cors middleware

mongoose.connect('mongodb+srv://shuvrocadet:xzSgLNfWlctcKzOm@cluster0.l2bvgvl.mongodb.net/')
const db = mongoose.connection

db.on('error',(err)=> {
    console.log(err)
})

db.once('open',() => {
    console.log('Db connection established!')
})

const app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use("/uploads",express.static("uploads"));


// Get all employees
app.use('/api/employees', EmployeeRoute)
app.use('/api/auth',AuthRoute)

const PORT = process.env.PORT || 3000

app.listen(PORT, ()=>{
    console.log(`Server is listening on port ${PORT}`)
})