const USER = require('../model/user')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.Secuer = async (req,res,next) => {
    try {
        
        const token = req.headers.authorization  // token check for any token not valid token can not to be submitted
        if(!token) throw new Error('Token is Missing!')

        const isvalidtoken = jwt.verify(token, "users") // orignal token can only verify
        console.log(isvalidtoken);

        req.user = isvalidtoken.id  //  only user can show self contact.

        const isuser = await USER.findById(isvalidtoken.id)  //  check for user can Contact data (only User show only 1(him data) data not show all data) update, delete and read in database(mongodb)  // id can check only pass in contact router

        if(!isuser) throw new Error('User data are Not Avalable in Database')

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

        let findUser
        if (req.query.search) {
            findUser = await USER.find({
                $or: [
                    { firstName: { $regex: req.query.search, $options: 'i' } },
                    { lastName: { $regex: req.query.search, $options: 'i' } },
                    { userName: { $regex: req.query.search, $options: 'i' } },
                    { email: { $regex: req.query.search, $options: 'i' } },
                ],
            });
        } else {
            findUser = await USER.find()
        }

        // let data = await USER.find()

        res.status(201).json({
            status: 'success',
            message: "User Found Successfully",
            data : findUser
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}

exports.signupUser = async (req, res, next) => {
    try {
        // console.log(req.file);
        // return res.send("test")
        
        let {firstName, userName, lastName, email, password } = req.body

        password = await bcrypt.hash(password, 8);
        // console.log("not work");

        let check = await USER.findOne({ email: email })
        if (check) throw new Error("Try Another Mail! This Mail Is Already Exist!")

        let data = await USER.create({
            profile : req.files.map(el => el.filename),
            firstName,
            lastName,
            userName,
            email,
            password
        });

        res.status(201).json({
            status: "success",
            message: "User Signup Successfully",
            data
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}



exports.loginUser = async (req, res, next) => {
    try {
        let { email, password } = req.body;

        // Fix: Await the result of findOne
        let findEmail = await USER.findOne({ email });
        if (!findEmail) throw new Error('Email is wrong');


        let isPasswordValid = await bcrypt.compare(password, findEmail.password);
        if (!isPasswordValid) throw new Error('Password is wrong');

        const token = jwt.sign({id: findEmail._id},"users")

        // console.log("+++++");

        res.status(201).json({
            status: "SUCCESS",
            message: "USER Login Successfully",
            data: findEmail,
            token

        });
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        });
    }
};


exports.updateUser = async (req, res, next) => {
    try { 
        let { password } = req.body

        if (password) {
            
            req.body.password = await bcrypt.hash(password, 8)
        }

        console.log(password,"+++");
        
        let findId = await USER.findById(req.params.id)
        if (!findId) throw new Error('USER Not Fund')

        console.log(req.body);

        let data = await USER.findByIdAndUpdate(req.params.id, req.body, { new: true })

        res.status(201).json({
            status: "SUCCESS",
            message: "USER Update are Successfully",
            data
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}


exports.deleteUser = async (req, res, next) => {
    try {

        let findId = await USER.findById(req.params.id)
        if (!findId) throw new Error('USER Not Found!')

        let data = await USER.findByIdAndDelete(req.params.id)

        res.status(200).json({
            status: "SUCCESS",
            message: "USER Delete are Succesfully",
            data
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}


