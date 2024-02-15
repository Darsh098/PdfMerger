import express from 'express';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import multer from 'multer';
import mergePDF from './merge.js';
const app = express()
const upload = multer({dest:'uploads/' })
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use('/static',express.static('public'))
const port = 3000

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,"templates/index.html"))
})

app.post('/merge',upload.array('pdfs',12),async(req,res,next)=>{

    console.log(req.files)
    let pdfName = await mergePDF(path.join(__dirname,req.files[0].path),path.join(__dirname,req.files[1].path))
    // res.send({data:req.files})
    res.redirect(`http://localhost:3000/static/${pdfName}.pdf`)
})

app.listen(port,()=>{
    console.log(`App Listening on http://localhost:${port}`)
})