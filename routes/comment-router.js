var express = require('express');
var router = express.Router();
var controller = require('../controllers/comment-controller');
/* GET users listing. */
router.get('/:idpost', function(req, res, next) {
    controller.ObtenerPorPost( req.params.idpost, function(err,comments){
        if(err){
            res.status(500);
            res.end();
        }else{
            console.log("comments que llegaron");
            //console.log(comments);
            res.json(comments);

        }
    });
});

router.post('/nuevo/:idPost', function (req, res, next) {

   var content= req.body.comment;
   var usuario= req.cookies['usuario'];
   var post=req.params.idPost;

    controller.nuevoComment(content ,post, usuario, function (err, likes) {
        if (err) {
            res.status(500);
            res.end();
            console.log("ño lo cree");
        } else {

            //console.log(likes);
            console.log("Hice un comment");
res.redirect("/feed");
            //res.json(likes);

        }
    });
});

module.exports = router;
