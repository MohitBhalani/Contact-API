let express = require('express')
let router = express.Router()

let contactController = require('../controller/contact')
let userController = require('../controller/user')

router.post('/creat', userController.Secuer,contactController.creatContact)

router.get('/read', userController.Secuer, contactController.readContact)

router.patch('/update/:id', userController.Secuer, contactController.updateContact)

router.delete('/delete/:id', userController.Secuer, contactController.deleteContact)


module.exports = router