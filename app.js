var express = require('express');
var path = require('path');
var logger = require('morgan');
var multer= require('multer');
const {v4 : uuidV4 } = require('uuid')




var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

var storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'public/images')
    },
    filename: function (req, file, cb) {
        const randomPart = uuidV4(); // use whatever random you want.
        const extension = file.mimetype.split('/')[1];
        cb(null,randomPart + `.${extension}`)

    }
})

var imageFileFilter=(req,file,cb)=>{
    if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)){
    return cb(new Error('You can upload Only Image Files!',false))
    }
    
    cb(null,true)
}

upload= multer({ storage:storage,fileFilter:imageFileFilter})

//imageFile is Key for File in form
 app.post('/upload',upload.single('image'),(req,res)=>{
 res.statusCode=200
 res.json(req.file)
 })
 
 app.get('/',(req,res,next)=>{
     res.send('arsh')
 })

 

module.exports = app;
