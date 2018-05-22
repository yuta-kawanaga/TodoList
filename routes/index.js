var express = require('express');
var router = express.Router();

const mongoose = require("mongoose");

// DBとの接続処理
mongoose.connect("mongodb://localhost/todo", (err) => {
  if (err) {
    console.log(`DB Connect Fail!!${err}`);
  }
  else {
    console.log("DB Connect Success!");
  }
});

// GET home page. 
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});


// 読み込み時表示処理 
router.get('/all', function (req, res, next) {
  // コレクション生成
  const UserData = mongoose.model("UserSchema");

  // 全文検索
  UserData.find({}, (err, docs) => {
    // DBの内容をJSON形式で返す
    res.send(docs);
  });
});

// データの挿入処理
router.post("/", (req, res, next) => {
  // コレクション生成
  const UserData = mongoose.model("UserSchema");
  const userData = new UserData();

  userData.text = req.body.text;
  userData.complete = req.body.complete;

  // データのinsert
  userData.save((err) => {
    if (err) {
      console.log(`Insert Fail!!${err}`);
    }
    else {
      // 全文検索
      UserData.find({}, (err, docs) => {
        for (let cnt = 0; cnt < docs.length; cnt++) {
          console.log(docs[cnt]);
        }
      });
    }
  });
});


// データの物理削除
router.delete("/delete", (req, res) => {
  console.log(req.body);

  let data = req.body;

  // データの削除
  const UserData = mongoose.model("UserSchema");
  UserData.remove({ _id: data }, (err) => {

  });
});


// データの更新要求
router.put("/update", (req, res) => {
  console.log(req.body);

  const text = req.body.text;
  const _id = req.body._id;
  console.log(text);


  // データの更新
  const UserData = mongoose.model("UserSchema");
  UserData.update({ _id: _id }, { $set: { text: text } }, (err, data) => {
    //   console.log(text);
  });
});


module.exports = router;
