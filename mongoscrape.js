var express = require('express');
var app = express();
var request = require('request');
var cheerio = require('cheerio');

//Database configuration
var mongojs = require('mongojs');
var databaseUrl = "scraper";
var collections = ["scrapedData"];
var db = mongojs(databaseUrl, collections);
db.on('error', function(err) {
  console.log('Database Error:', err);
});


app.get('/scraper', function(req,res){
  request('https://news.ycombinator.com', function (error, response, html) {
    if (!error && response.statusCode == 200) {
      var $ = cheerio.load(html);
      var result = [];
      $('span.comhead').each(function(i, element){
        var a = $(this).prev();
        var rank = a.parent().parent().text();
        var title = a.text();
        var url = a.attr('href');
        var subtext = a.parent().parent().next().children('.subtext').children();
        var points = $(subtext).eq(0).text();
        var username = $(subtext).eq(1).text();
        var comments = $(subtext).eq(2).text();
        // var parsedData = {
        //   rank: parseInt(rank),
        //   title: title,
        //   url: url,
        //   points: parseInt(points),
        //   username: username,
        //   comments: parseInt(comments)
        // };
        // console.log(parsedData);
        // res.send(parsedData);
        result.push({parsedData : {rank: parseInt(rank),
          title: title,
          url: url,
          points: parseInt(points),
          username: username,
          comments: parseInt(comments)} });

      });
      res.send(result);
    }
    
  });

});




app.listen(3000, function() {
  console.log('App running on port 3000!');
});