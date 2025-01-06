var express = require('express');
var router = express.Router();

let controller = require('../controller/Admin')

router.get('/read', controller.Secure, controller.readData)

router.post('/signup', controller.signupAdmin)

router.post('/login', controller.loginAdmin)

// router.patch('/update/:id', controller.updateAdmin)

// router.delete('/delete/:id', controller.deleteAdmin)

module.exports = router;
