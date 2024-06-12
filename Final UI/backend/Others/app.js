const express = require('express');
const app = express();
const multer = require('multer');
const upload = multer({dest: 'uploads/'});

app.get('/',(req,res)=>{
    res.send('Hello World');
});

app.post('/api/upload',upload.single('file'),(req,res) =>{
    res.send(req.file);
});
const port = process.env.PORT || 3000;

app.listen(port,() => {
    console.log(`listening on port `,port);
});
