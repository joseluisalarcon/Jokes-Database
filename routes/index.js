var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/commentDB', {
    useMongoClient: true
});
var commentSchema = mongoose.Schema({
    Name: String,
    Comment: String
});

var Comment = mongoose.model('Comment', commentSchema);
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function() {
    console.log("Connected")
});


/* GET home page. */
/*router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});*/

router.get('/fake', function(req, res, next) {
    console.log("Fake");
    var fakelist = [{
        Name: "Jim",
        Comment: "Hi"
    }];
    res.json(fakelist);
});
router.get('/comment', function(req, res, next) {
    console.log("Comment");
    Comment.find(function(err, commentList) {
        if (err) return console.error(err);
        else {
            console.log(commentList);
            res.json(commentList);
        }
    });
});

router.post('/delete', function(req, res, next) {
    console.log("Delete");
    Comment.remove(function(err) {
        if (err) return console.error(err);
        else {
            console.log("Delete worked");
            res.sendStatus(200);
        }
    });
});

router.post('/comment', function(req, res, next) {
    console.log("Comment Post");
    console.log(req.body);
    var newcomment = new Comment(req.body); //[3]
    console.log(newcomment); //[3]
    newcomment.save(function(err, post) { //[4]
        if (err) return console.error(err);
        console.log(post);
        res.sendStatus(200);
    });
});

module.exports = router;