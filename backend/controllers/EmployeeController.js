const Employee = require('../models/Employee')

const index =  async (req, res) => {
    try {
        const employees = await Employee.find();
        res.json(employees);
    } catch (error) {
        res.status(500).json({ message: "An error occurred while fetching employees" });
    }

}

const show = async (req, res) => {
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
}

const store = async (req, res, next) => {
    try {
        let employee = new Employee({
            name: req.body.name,
            designation: req.body.designation,
            email: req.body.email,
            phone: req.body.phone,
            age: req.body.age
        });

        if (req.file) {
            employee.file = req.file.path;
        }

        const response = await employee.save();
        res.json({
            message: 'Employee added successfully',
            employee: response // Include response in the JSON

        });
    } catch (error) {
        res.json({
            message: 'An error occurred'
        });
    }
};

const update = (req,res,next) => {
        let EmployeeID = req.params.employeeId

        let updatedData = {
            name: req.body.name,
            designation: req.body.designation,
            email: req.body.email,
            phone: req.body.phone,
            age: req.body.age
        }
        if (req.file) {
            updatedData.file = req.file.path;
        }


        Employee.findByIdAndUpdate(EmployeeID,{$set: updatedData})
        .then(()=> {
            res.json({
                message: 'Employee updated successfully!'
            })
        })
        .catch(error => {
            res.json({
                message: 'An error Occured!'
            })
        })
}

const remove = async (req, res, next) => {
    let EmployeeID = req.params.employeeId
    try {
        await Employee.findByIdAndDelete(EmployeeID);
        res.json({
            message: 'Employee removed successfully!'
        });
    } catch (error) {
        res.json({
            message: 'An error occurred!'
        });
    }
};
module.exports = {
    index,show,store,update,remove
}


