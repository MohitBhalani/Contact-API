const { router } = require('../app');
const ADMIN = require('../model/admin');
let bcrypt = require('bcrypt')
let jwt = require('jsonwebtoken') 


exports.Secure = async (req,res,next) => {
    try {
        
        console.log("hello");
        
        const token = req.headers.authorization   //  token check for any token not valid token can not to be submitted
        if(!token) throw new Error('Admin Token is Not Valid')

        const isvalidtoken = jwt.verify(token, "admin")  //  original token can only verify
        console.log(isvalidtoken);

        const isadmin = await ADMIN.findById(isvalidtoken.id)  //  check for Admin can userdata update, delete and read in database(mongodb)  // id can check only pass in userrouter router

        if(!isadmin)  throw new Error('ADMIN Data are Not Avalable in Database')  // if user can logout when not login with token 

        next()
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}


exports.readData = async (req, res, next) => {
    try {

        let data = await ADMIN.find()

        res.status(201).json({
            status: "Success",
            message: "ADMIN Found Successfully",
            data
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}


exports.signupAdmin = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        req.body.password = await bcrypt.hash(password, 8);

        let check = await ADMIN.findOne({ email: email });
        if (check) throw new Error("Enter Another Mail! This Mail Already Exists!");

        // req.body.password = hashedPassword;

        let data = await ADMIN.create(req.body);

        res.status(201).json({
            status: "Success",
            message: "ADMIN signup Successfully",
            data
        });
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        });
    }
};



exports.loginAdmin = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        let findEmail = await ADMIN.findOne({ email });
        if (!findEmail) throw new Error("Email is Wrong");

        const findPassword = await bcrypt.compare(password, findEmail.password);
        if (!findPassword) throw new Error("Password is Wrong");

        const token = jwt.sign({id: findEmail._id},"admin")

        res.status(201).json({
            status: "Success",
            message: "ADMIN Login Successfully",
            data: findEmail,
            token
        });
    } catch (error) {
        res.status(404).json({
            status: "Fail to login",
            message: error.message
        });
    }
};



// exports.updateAdmin = async (req, res, next) => {
//     try {
//         let {password} = req.body

//         req.body.password = await bcrypt.hash(password, 8)

//         let findId = await ADMIN.findById(req.params.id)
//         if (!findId) throw new Error('ADMIN not Found!')

//         console.log(findId);

//         let data = await ADMIN.findByIdAndUpdate(req.params.id, req.body, { new: true })

//         res.status(201).json({
//             status: "Success",
//             message: "Update Data Are Successfully",
//             data
//         })
//     } catch (error) {
//         res.status(404).json({
//             status: "Fail To Update",
//             message: error.message
//         })
//     }
// }



// exports.deleteAdmin = async (req, res, next) => {
//     try {

//         let findId = await ADMIN.findById(req.params.id)
//         if (!findId) throw new Error('ADMIN not Found!')

//         console.log(findId);

//         let data = await ADMIN.findByIdAndDelete(req.params.id)

//         res.status(201).json({
//             status: "Success",
//             message: "Delete Data Are Successfully",
//             data
//         })
//     } catch (error) {
//         res.status(404).json({
//             status: "Fail To Delete",
//             message: error.message
//         })
//     }
// }