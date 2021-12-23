const express = require('express')
let app = express()
const multer = require('multer')
const fs = require('fs')
const path = require('path')

const multiparty = require('multiparty');

var router = express.Router();
//single是单图片上传，多图片上传 array ,single里面就是上传图片的key值 
//和图片相关的是req.file 
// app.use('/public',express.static(path.join(__dirname,'./www')))

app.post('/aa',multer().single('img'),(req,res)=>{
    let {buffer,mimetype} = req.file;
    let fileName = (new Date()).getTime() + parseInt(Math.random()*3435) + parseInt(Math.random()*6575);
    let fileType = mimetype.split('/')[1];
    let filePath =  path.join(__dirname,'/www/images')
    let apath = `http://localhost:5500/public/images/${fileName}.${fileType}`
   
    fs.writeFile(`./www/images/${fileName}.${fileType}`,buffer,(data)=>{
        if(data){
            res.send({err:0,msg:"上传失败"})
        }else{
            res.send({err:1,msg:"上传成功",imgPath:apath})
        }
    })
})


router.post("/file_upload", function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    /* 生成multiparty对象，并配置上传目标路径 */
    let form = new multiparty.Form();
    /* 设置编辑 */
    form.encoding = 'utf-8';
    //设置文件存储路劲
    form.uploadDir = './file';
    //设置文件大小限制
    // form.maxFilesSize = 1 * 1024 * 1024;
    form.parse(req, function (err, fields, files) {
      try {
        let inputFile = files.file[0];
        let uploadedPath = inputFile.path;
        let newPath = form.uploadDir + "/" + inputFile.originalFilename;
        //同步重命名文件名 fs.renameSync(oldPath, newPath)
        fs.renameSync(inputFile.path, newPath);
        res.send({ data: "上传成功！" });
        //读取数据后 删除文件
        // fs.unlink(newPath, function () {
        //   console.log("删除上传文件");
        // })
      } catch (err) {
        console.log(err);
        res.send({ err: "上传失败！" });
      };
    })
}) 

app.listen('9000',()=>{
    console.log('start')
})
