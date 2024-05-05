const express = require('express')
const router = express.Router()
const upload  = require('../middleware/fileupload')


const EmployeeController = require('../controllers/EmployeeController')
const select = require('../Others/Best_CV')
const skillset = require('../Others/Search_based_on_skillset')
const Traverse  = require('../controllers/TrvaerseController');

router.post('/best_cv', Traverse.Traverse);
router.post('/data', EmployeeController.data)
router.get('/best_cv', select.Traverse)
router.get('/skill', skillset.Traverse)
router.get('/', EmployeeController.index)
router.get('/:employeeId',EmployeeController.show)
router.post('/',upload.single('file'), EmployeeController.store)
router.put('/:employeeId',upload.single('file'),EmployeeController.update)
router.delete('/:employeeId',EmployeeController.remove)

module.exports = router