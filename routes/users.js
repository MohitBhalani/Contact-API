var express = require('express');
var router = express.Router();
let multer = require('multer')

let userController = require('../controller/user')
let adminController = require('../controller/Admin')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' +uniqueSuffix + "." + file.originalname.split('.').pop())
    }
})

const upload = multer({ storage: storage })

/* GET users listing. */
router.get('/read', adminController.Secure, userController.readData);

router.post('/signup', upload.array('profile',2), userController.signupUser);

router.post('/login', userController.loginUser)

router.patch('/update/:id', adminController.Secure, userController.updateUser)

router.delete('/delete/:id', adminController.Secure, userController.deleteUser)

module.exports = router;
