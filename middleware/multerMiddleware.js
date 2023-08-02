let express = require("express"); 
const { func } = require("joi");
let app = express();
let multer = require("multer");
let uplode  = multer({
    storage : multer.diskStorage({
        destination:function(req,file,cb){
            cb(null,"public/upload")
        },
        filename:function(req,file,cb){
            let uniqueSuffix = Date.now() + "-" + Math.round(Math.random()*1E9);
            let ext = file.originalname.split('.').pop();
            cb(null,file.fieldname + "-" + ext[ext.length-1])
            
        }
    }),
    limit:4000,
    fileFilter:function(req,file,cb){
        cb(null,true)
    }
});

let storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"public/upload")
    },
    filename:function(req,file,cb){
        let newName = Date.now()+"-"+Math.round(Math.random()*1E9);
        let ext = file.originalname.split(".").
    }
})