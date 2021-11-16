var express = require("express");
var shell = require('shelljs')
var bodyParser = require('body-parser');//解析,用req.body获取post参数


const port=8000; //定义后端端口号为8000

var app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));


function mkiso(git_url,branch_name,arch){
    option_data=git_url+" "+branch_name+" "+arch;
    console.log(option_data);
    
    shell.cd('../mk_iso/');
    shell.exec('bash ./main.sh '+option_data,function (code, stdout, stderr) {
        console.log('Exit code:', code);
        console.log('Program output:', stdout);
        console.log('Program stderr:', stderr);
      },{async:true});
}

function buildpkg(git_url,branch_name){
    option_data=git_url+" "+branch_name;
    console.log(option_data)

    shell.cd('../build_pkg/');
    shell.exec('bash build_pkg.sh '+option_data,function (code, stdout, stderr) {
        console.log('Exit code:', code);
        console.log('Program output:', stdout);
        console.log('Program stderr:', stderr);
      },{async:true});
}

app.post("/mkiso",function(req,res){
    
    mkiso(req.body.git_url,req.body.branch_name,req.body.arch);
    //允许来自其他端口的请求头
    res.header("Access-Control-Allow-Origin", "*");
    //返回一个状态--暂定
    res.send({status:'OK'});
})

app.post("/buildpkg",function(req,res){
    
    buildpkg(req.body.git_url,req.body.branch_name);
    //允许来自其他端口的请求头
    res.header("Access-Control-Allow-Origin", "*");
    //返回一个状态--暂定
    res.send({status:'OK'});
})

app.listen(port,() => console.log(`Server listening on port ${port}!`));
