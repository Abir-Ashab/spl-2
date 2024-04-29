const multer = require('multer')

const storage = multer.diskStorage({
   destination: function (req, file, cb) {
     cb(null, 'uploads/')
   },
   filename: function (req, file, cb) {
     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
     cb(null, file.fieldname + '-' + uniqueSuffix)
   }
 })

 const upload = multer({ 
    storage: storage
    // fileFilter: function(req,file, callback){
    //     if(
    //         file.mimetype == "pdf" 
    //     ){
    //         callback(null,true)
    //     }else{
    //         console.log('only pdf file is supported!')
    //         callback(null,false)
    //     }
    // }
  })


 module.exports = upload