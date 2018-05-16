var express = require('express');
var router = express.Router();

const mongoose = require("mongoose");

// DSとの接続処理
mongoose.connect("mongodb://localhost/todo", (err) => {
  if (err) {
    console.log(`DB Connect Fail!!${err}`);
  }
  else {
    console.log("DB Connect Success!");
  }
});

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post("/", (req, res, next) => {
  console.log(req.body);
  res.send(req.body.text);

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
      // find 全文検索
      UserData.find({}, (err, docs) => {
        for (let cnt = 0; cnt < docs.length; cnt++) {
          console.log(docs[cnt]);
        }
      });
    }
  });

});



module.exports = router;
