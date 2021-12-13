var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/';
MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    console.log('数据库已创建');
    var dbase = db.db("runoob");
    var myobj =  [
        { name: '菜鸟工具', url: 'https://c.runoob.com', type: 'cn'},
        { name: 'Google', url: 'https://www.google.com', type: 'en'},
        { name: 'Facebook', url: 'https://www.google.com', type: 'en'}
       ];
    // dbase.collection("site").insertMany(myobj , function (err, res) {
    //     if (err) throw err;
    //     console.log("插入成功");
    //     // db.close();
    // });

    // dbase.collection("site"). find({}).toArray(function(err, result) { // 返回集合中所有数据
    //     if (err) throw err;
    //     console.log(result);
    //     // db.close();
    // });
    var whereStr = {"name":'菜鸟教程'};
    dbase.collection("site").find(whereStr).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        
    });

    dbase.collection("site").deleteOne(whereStr, function(err, obj) {
        if (err) throw err;
        console.log("文档删除成功");
        // db.close();
    });

    var whereStr = {"name":'菜鸟教程'};
    dbase.collection("site").find(whereStr).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        db.close();
    });
});