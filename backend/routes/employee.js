const express = require('express')
const router = express.Router()
const upload  = require('../middleware/fileupload')


const EmployeeController = require('../controllers/EmployeeController')

router.get('/', EmployeeController.index)
router.get('/:employeeId',EmployeeController.show)
router.post('/',upload.single('file'), EmployeeController.store)
router.put('/:employeeId',upload.single('file'),EmployeeController.update)
router.delete('/:employeeId',EmployeeController.remove)

module.exports = router