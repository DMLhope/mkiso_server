var express = require("express");
const port=8000;
var bodyParser = require('body-parser');//解析,用req.body获取post参数
var app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));

app.post("/",function(req,res){
    console.log(JSON.stringify(req.body));
    res.header("Access-Control-Allow-Origin", "*");
    res.send({hello:'world'});
})

app.listen(port,() => console.log(`Example app listening on port ${port}!`));
