let CONTACT = require('../model/contact')


exports.readContact = async (req,res,next) => {
    try {
        let findData;
        if (req.query.search) {
            findData = await CONTACT.find({
                $or: [
                    { name: { $regex: req.query.search, $options: 'i' } },
                    { email: { $regex: req.query.search, $options: 'i' } },
                    { phone: { $regex: req.query.search, $options: 'i' } },
                    { address: { $regex: req.query.search, $options: 'i' } },
                ]
            });
        }else {

            findData = await CONTACT.find({ userId : req.user }).populate('userId')
        }


        res.status(201).json({
            status: "SUCCESS",
            message: "Contacts Reads Are Successfully",
            data : findData
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}


exports.creatContact = async (req,res,next) => {
    try {
        
        const {name,email,phone, address,userId} = req.body

        let check = await CONTACT.findOne({email : email})
        if(check) throw new Error("TRY Another Email id! This Email is Already Exists")

        let data = await CONTACT.create({
            name,
            email,
            phone,
            address,
            userId
        })


        res.status(201).json({
            status: "SUCCESS",
            message: "Contact Created Successfull",
            data
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message : error.message
        })
    }
}



exports.updateContact = async (req,res,next) => {
    try {
        
       let findContact = await CONTACT.findById(req.params.id)
       if(!findContact) throw new Error('Contact is Not Found')

        let data = await CONTACT.findByIdAndUpdate(req.params.id, req.body, {new : true})

        // console.log("Hello",req.body);
        
        res.status(201).json({
            status: "SUCCESS",
            message: "Contacts Update are Successfully",
            data
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}



exports.deleteContact = async (req,res,next) => {
    try {
        
       let findContact = await CONTACT.findById(req.params.id)
       if(!findContact) throw new Error('Contact is Not Found')

        let data = await CONTACT.findByIdAndDelete(req.params.id)

        // console.log("Hello",req.body);
        
        res.status(201).json({
            status: "SUCCESS",
            message: "Contacts Delete are Successfully",
            data
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}