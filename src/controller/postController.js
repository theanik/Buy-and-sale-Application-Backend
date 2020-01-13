const {Post,User} = require('../../models/index')
const _p = require('../utils/promis')
const multer = require('multer')
const router = require('express').Router();
const { check } = require('express-validator')
const reject_invalid = require('../middelware/reject_invalid')


//begin file upload section
var storage = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, 'uploads/post-photo/');
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
    {name : 'image'},
])

//end file upload section

//post create validate
const postValidator = [
    check('userId').exists(),
    check('location').exists(),
    check('condition').exists(),
    check('bikeType').exists(),
    check('barnd').exists(),
    check('model').exists(),
    check('year').exists(),
    check('year').exists(),
    check('kmRun').exists(),
    check('cc').exists(),
    check('description').exists(),
    check('contactName').exists(),
    check('contactPhone').exists(),
]




router.post('/api/v1/create_post', upload, postValidator, reject_invalid, async(req,res)=>{

    let { userId, userName,location , lat ,lng ,condition ,bikeType ,barnd ,model ,year ,kmRun ,cc ,
        details,description ,contactName ,contactPhone ,contactEmail} = req.body

    // let image = null
    if(!req.files.image){
        res.send("Image are required")
        // image = req.files.image[0].path
    }
    let [reqErr, postCreated] = await _p(Post.create({
        userId, userName,location , lat ,lng ,condition ,bikeType ,barnd ,model ,year ,kmRun ,cc ,
        image : req.files.image[0].path ,details,description ,contactName ,contactPhone ,contactEmail
    }))

    if(!reqErr && postCreated){
        res.json({success : true , message : "Post Done !!" }).status(201)
    }else{
        res.json({error : true , message : reqErr.message}).status(401)
    }

})


router.put('/api/v1/update_post/:id', upload, postValidator, reject_invalid, async(req,res)=>{

    let post_id = req.params.id

    let [Err, PostData] = await _p(Post.findOne({
        where : {
            id : post_id
        }
    }))

    let { userId, userName,location , lat ,lng ,condition ,bikeType ,barnd ,model ,year ,kmRun ,cc ,
        details,description ,contactName ,contactPhone ,contactEmail} = req.body
    

    let image = null
    if(req.files.image){
        image = req.files.image[0].path
    }else{
        image = PostData.image
    }
    let [reqErr, postUpdated] = await _p(Post.update({
        userId, userName,location , lat ,lng ,condition ,bikeType ,barnd ,model ,year ,kmRun ,cc ,
        image ,details,description ,contactName ,contactPhone ,contactEmail
    },{ where : {
        id : post_id
    }}))

    if(!reqErr && postUpdated){
        res.json({success : true , message : "Post Update Done !!" }).status(201)
    }else{
        res.json({error : true , message : reqErr.message}).status(401)
    }

})

router.get('/api/v1/show_post/:id', async(req,res)=>{

    let post_id = req.params.id

    
    let [reqErr, PostDetails] = await _p(Post.findOne({
        where : {
            id : post_id
        },
        include : [User]
    }))

    if(!reqErr && Post){
        res.json({success : true , PostDetails }).status(201)
    }else{
        res.json({error : true , message : reqErr.message}).status(401)
    }

})


router.get('/api/v1/all_post', async(req,res)=>{

    let post_id = req.params.id

    
    let [reqErr, AllPost] = await _p(Post.findAll({
        include : [User]
    }))

    if(!reqErr && Post){
        res.json({success : true , AllPost }).status(201)
    }else{
        res.json({error : true , message : reqErr.message}).status(401)
    }

})




  module.exports = router

