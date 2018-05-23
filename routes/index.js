var express = require("express");
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
router.get("/", (req, res, next) => {
  res.render("index", { title: "Express" });
});


// 読み込み時表示処理 
router.get("/all", (req, res) => {
  // コレクション生成
  const UserData = mongoose.model("UserSchema");

  // 全文検索
  UserData.find({}, (err, docs) => {
    // DBの内容をJSON形式で返す
    res.send(docs);
  });
});

// データの挿入処理
router.post("/", (req, res) => {
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
      console.log("Insert success");
    }
  });
});


// データの物理削除
router.delete("/delete", (req, res) => {
  // コレクション生成
  const UserData = mongoose.model("UserSchema");

  const _id = req.body;

  // データの削除
  UserData.remove({ _id: _id }, (err) => {
    if (err) {
      console.log(`Delete Fail!!${err}`);
    }
    else {
      console.log("Delete success");
    }
  });
});


// データの更新
router.put("/update", (req, res) => {
  // コレクション生成
  const UserData = mongoose.model("UserSchema");

  const text = req.body.text;
  const _id = req.body._id;
  
  // データの更新
  UserData.update({ _id: _id }, { $set: { text: text } }, (err, data) => {
    if (err) {
      console.log(`Update Fail!!${err}`);
    }
    else {
      console.log("Update success");
    }
  });
});


module.exports = router;
