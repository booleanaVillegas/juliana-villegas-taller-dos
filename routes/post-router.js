var express = require('express'),cookieParser = require('cookie-parser');
var router = express.Router();
var controller = require('../controllers/post-controller');
var likeController = require('../controllers/like-controller');
var commentController = require('../controllers/comment-controller');
var multer = require('multer');


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.jpg')
    }
});

var upload = multer({ storage: storage }).single('profileImage');


router.post('/', function (req, res) {
    upload(req, res, function (err) {
        if (err) {
            // An error occurred when uploading
        }
        res.json({
            success: true,
            message: 'Image uploaded!'
        });

        // Everything went fine
    })
});




/* GET users listing. */
router.get('/', function(req, res, next) {

    controller.ObtenerTodos( function(err,posts){
        if(err){
            res.status(500);
            res.end();
        }else{
            //console.log("posts que llegaron");
            //console.log(posts);

            res.json(posts);



            /*
            var post = posts.find(function(item) {
                return item.id_post == 3;
            });
var nuevosPost= [];
            for (i = 1; i <= posts.length; i++){
                var post = posts.find(function(item) {
                    return item.id_post == i;
                });
                var nlikes;
                likeController.ObtenerPorPost(post.id_post,function (err,likes) {
                    if(err){
                        res.status(500);
                        res.end();
                        nlikes=0;
                    }else{
                        nlikes=likes.length;
                    }
                });
                var ncomments;
                commentController.ObtenerPorPost(post.id_post,function (err,comments) {
                    if(err){
                        res.status(500);
                        res.end();
                        ncomments=0;
                    }else{
                        ncomments=comments.length;
                        console.log(ncomments);
                    }
                });
                var nuevoPost= {id_post:post.id_post, description:post.description, username:post.username, image:post.image, likes:nlikes, comments:ncomments};


                nuevosPost.push(nuevoPost);
            }
            console.log(nuevosPost);
            res.json(nuevosPost);

*/
        }
    });
});

module.exports = router;
