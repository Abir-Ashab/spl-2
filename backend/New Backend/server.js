const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const Employee = require('./models/Employee');

mongoose.connect('mongodb+srv://niloy:31288932@cluster0.qhe3sti.mongodb.net/')
const db = mongoose.connection

db.on('error',(err)=> {
    console.log(err)
})

db.once('open',() => {
    console.log('Db connection established!')
})

const app = express()


app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

// Get all employees
app.get('/api/employees', async (req, res) => {
    try {
        const employees = await Employee.find();
        res.json(employees);
    } catch (error) {
        res.status(500).json({ message: "An error occurred while fetching employees" });
    }
});

// Get an employee by ID
app.get('/api/employees/:employeeId', async (req, res) => {
    const employeeId = req.params.employeeId;
    try {
        const employee = await Employee.findById(employeeId);
        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }
        res.json(employee);
    } catch (error) {
        res.status(500).json({ message: "An error occurred while fetching the employee" });
    }
});

// Create a new employee
app.post('/api/employees', async (req, res) => {
    try {
        const employee = new Employee(req.body);
        await employee.save();
        res.status(201).json({ message: "Employee created successfully" });
    } catch (error) {
        res.status(500).json({ message: "An error occurred while creating the employee" });
    }
});

// Update an employee by ID
app.put('/api/employees/:employeeId', async (req, res) => {
    const employeeId = req.params.employeeId;
    try {
        await Employee.findByIdAndUpdate(employeeId, req.body);
        res.json({ message: "Employee updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "An error occurred while updating the employee" });
    }
});

// Delete an employee by ID
app.delete('/api/employees/:employeeId', async (req, res) => {
    const employeeId = req.params.employeeId;
    try {
        await Employee.findByIdAndDelete(employeeId);
        res.json({ message: "Employee deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "An error occurred while deleting the employee" });
    }
});

const PORT = process.env.PORT || 3000

app.listen(PORT, ()=>{
    console.log(`Server is listening on port ${PORT}`)
})
