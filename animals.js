var express = require('express');
var mongojs = require('mongojs');
var app= express();


var PORT = process.env.PORT || 3000;

var db= mongojs('zoodb', ['favoriteanimals']);
db.on('error', function (err){
  console.error('database error', err);
});

app.get('/', function(req,res){
  res.send('works');
});


app.get('/animals', function(req,res){
  db.favoriteanimals.find({}, function(err,dbResults){
    if (err){
      throw err;
    }
    res.json(dbResults);
  });
});
  

app.get('/weight', function(req,res){
    db.favoriteanimals.find().sort({weight:1}, function(err,dbResults){
    if (err){
      throw err;
    }
    res.json(dbResults);
  });
});

app.get('/numlegs', function(req,res){
    db.favoriteanimals.find().sort({numlegs:1}, function(err,dbResults){
    if (err){
      throw err;
    }
    res.json(dbResults);
  });
});

  


app.listen(PORT,function (){
  console.log("listening on port %s", PORT);
});

