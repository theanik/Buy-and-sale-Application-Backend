const {User, ShowroomDetails} = require('../../models/index')
const _p = require('../utils/promis')
const multer = require('multer')
const router = require('express').Router();

var storage = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, 'uploads/user-photo/');
    },
    filename: function (req, file, callback) {
      callback(null, file.fieldname + '-' + file.originalname);
    }
  });
const fileFilter = (req, file, callback)=> {
    if(file.mimetype == "image/jpeg" || file.mimetype == "image/jpg" || file.mimetype == "image/png"){
        callback(null, true)
    }else{
        callback(null, false)
    }
}



var upload = multer({storage : storage, fileFilter : fileFilter}).fields([
    {name : 'coverPhoto'},
    {name : 'profilePhoto'}
])




router.post('/api/v1/register_user', upload, async(req,res)=>{
    // console.log(req.body)
    // console.log(req.files)
    // console.log(req.files.coverPhoto[0].path)

    let { name, email, phone, type, deviceId, lat, lng, address} = req.body

    const userType = req.body.type.toLowerCase().trim()
    console.log(userType)
    if(userType == "personal") {
        console.log(userType)
        let [reqErr, registerUser] = await _p(User.create({
            name, email, phone, type,deviceId
        }))

        if(reqErr && !registerUser){
            console.log(reqErr)
            res.json({error : true , message : reqErr.message}).status(401)
        }else{
            res.json({success : true , message : "User Registration Done !!" }).status(201)
        }
    }else if(userType == "showroom"){
        
        console.log(userType)
        let [reqErr, registerUser] = await _p(User.create({
            name, email, phone, type, deviceId
        }))

        if(!reqErr && registerUser){
            console.log("heare")
            let profilePhoto = null
            let coverPhoto = null

            if(req.files.profilePhoto){
                profilePhoto = req.files.profilePhoto[0].path
            }
            if(req.files.coverPhoto){
               coverPhoto = req.files.coverPhoto[0].path
            }
            let [Err, CreateShowroomDetails] = await _p(ShowroomDetails.create({
                userId : registerUser.id , name, coverPhoto ,
                 profilePhoto, lat, lng, address
            }))


            if(!Err && CreateShowroomDetails){
                res.json({success : true , message : "User Registration Done !!" }).status(201)
            }else{
                res.json({error : true , message : Err.message}).status(401)
            }
        }else{
            res.json({error : true , message : reqErr.message}).status(401)
        }

    }else{
        res.json({error : true, message : "somethig went worng !!"})
    }
})





  module.exports = router

