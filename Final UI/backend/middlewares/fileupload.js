import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const originalName = path.parse(file.originalname).name;
    const extension = path.extname(file.originalname);
    cb(null, originalName + '-' + uniqueSuffix + extension);
  }
});

const upload = multer({ 
  storage: storage,
  fileFilter: function(req, file, callback){
    if(file.mimetype === 'application/pdf'){
      callback(null, true);
    } else {
      console.log('Only PDF files are supported!');
      callback(null, false);
    }
  }
});

export default upload;
