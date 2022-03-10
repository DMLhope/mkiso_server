var express = require("express");
var shell = require('shelljs')
var bodyParser = require('body-parser');//解析,用req.body获取post参数
var path = require('path');
var fs = require('fs')
var multer = require('multer')


const port=8000; //定义后端端口号为8000

var app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(express.static(path.join(__dirname, 'public')));
    //模板引擎
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'ejs');

    //设置跨域访问
app.all("*", function (req, res) {
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin", req.headers.origin || '*');
    // //允许的header类型
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
    // //跨域允许的请求方式 
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    // 可以带cookies
    res.header("Access-Control-Allow-Credentials", true);
    if (req.method == 'OPTIONS') {
        res.sendStatus(200);
    }
    // } else {
        
    // }
})


function mkiso(git_url,branch_name,arch,res){
    if (git_url == "" || branch_name == "" || arch== ""){
        console.log("参数缺失");
        //返回一个状态--暂定
        res.send({status:'Error'});
        return;
    }

    option_data=git_url+" "+branch_name+" "+arch;
    console.log(option_data);
    
    shell.cd('../mk_iso/');
    shell.exec('bash ./main.sh '+option_data,function (code, stdout, stderr) {
        console.log('Exit code:', code);
        console.log('Program output:', stdout);
        console.log('Program stderr:', stderr);
      },{async:true});

    //返回一个状态--暂定
    res.send({status:'Ok'});
}

function buildpkg(git_url,branch_name,repo,arch,res){

    
    if (git_url == "" || branch_name == "" || arch =="" || repo =="" ){
        console.log("参数缺失");
        //返回一个状态--暂定
        res.send({status:'Error'});
        return;
    }

    console.log(arch);

    option_data=git_url+" "+branch_name;
    console.log(option_data);

    shell.cd('../build_pkg/');
    shell.exec('bash build_pkg.sh '+option_data,function (code, stdout, stderr) {
        console.log('Exit code:', code);
        console.log('Program output:', stdout);
        console.log('Program stderr:', stderr);
      },{async:true});

    //返回一个状态--暂定
    res.send({status:'Ok'});
}

function owntest(ip_adress,test_name,res){

    
    if (ip_adress == "" ){
        console.log("参数缺失");
        //返回一个状态--暂定
        res.send({status:'Error'});
        return;
    }


    option_data=ip_adress+" "+test_name;
    console.log(option_data)

    shell.cd('../own_test/');
    shell.exec('bash main-send_scripts.sh '+option_data,function (code, stdout, stderr) {
        console.log('Exit code:', code);
        console.log('Program output:', stdout);
        console.log('Program stderr:', stderr);
      },{async:true});

    //返回一个状态--暂定
    res.send({status:'Ok'});
}

app.post("/mkiso",function(req,res){
    //允许来自其他端口的请求头
    // res.header("Access-Control-Allow-Origin", "*");
    mkiso(req.body.git_url,req.body.branch_name,req.body.arch,res);
    
    //返回一个状态--暂定
    // res.send({status:'OK'});
})

app.post("/buildpkg",function(req,res){
    //允许来自其他端口的请求头
    // res.header("Access-Control-Allow-Origin", "*");
    buildpkg(req.body.git_url,req.body.branch_name,req.body.repo,req.body.arch,res);
    
    
})

app.post("/owntest",function(req,res){
    //允许来自其他端口的请求头
    // res.header("Access-Control-Allow-Origin", "*");
    owntest(req.body.ip_adress,req.body.test_name,res);
    
    
})


//上传文件
app.post('/upload', (req, res) => {

    var upload = multer({ dest: 'upload/' }).any();
  
    upload(req, res, err => {
      if (err) {
        console.log(err);
        return
      }
      let file = req.files[0]
      let filname = file.originalname
      var oldPath = file.path
      var newPath = path.join(process.cwd(), "upload/" + new Date().getTime()+filname)
      var src = fs.createReadStream(oldPath);
      var dest = fs.createWriteStream(newPath);
      src.pipe(dest);
      src.on("end", () => {
        let filepath = path.join(process.cwd(), oldPath)
        fs.unlink(filepath, err => {
          if (err) {
            console.log(err);
            return
          }
          res.send("ok")
        }) 
      })
      src.on("error", err => {
        res.end("err")
      })
    })  
  })

app.listen(port,() => console.log(`Server listening on port ${port}!`));
