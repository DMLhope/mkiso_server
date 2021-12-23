var express = require("express");
var shell = require('shelljs')
var bodyParser = require('body-parser');//解析,用req.body获取post参数
var multiparty = require('multiparty');


const port=8000; //定义后端端口号为8000

var app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));


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
    res.header("Access-Control-Allow-Origin", "*");
    mkiso(req.body.git_url,req.body.branch_name,req.body.arch,res);
    
    //返回一个状态--暂定
    // res.send({status:'OK'});
})

app.post("/buildpkg",function(req,res){
    //允许来自其他端口的请求头
    res.header("Access-Control-Allow-Origin", "*");
    buildpkg(req.body.git_url,req.body.branch_name,req.body.repo,req.body.arch,res);
    
    
})

app.post("/owntest",function(req,res){
    //允许来自其他端口的请求头
    res.header("Access-Control-Allow-Origin", "*");
    owntest(req.body.ip_adress,req.body.test_name,res);
    
    
})


// app.post("/file_upload", function (req, res) {
//     res.header("Access-Control-Allow-Origin", "*");
//     console.log(req);
//     console.log('FIRST TEST: ' + JSON.stringify(req.files));
//     console.log('second TEST: ' +req.files.theFile.name);
//     fs.readFile(req.files.theFile.path, function (err, data) {
//         var newPath = "./file"+req.files.theFile.name;
//         fs.writeFile(newPath, data, function (err) {
//           res.send("hi");  
//         });
//     });

    
// }) 

app.listen(port,() => console.log(`Server listening on port ${port}!`));
