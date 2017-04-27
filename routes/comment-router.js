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

router.post('/nuevo', function (req, res, next) {
   var content= req.body.comment;
   var usuario= req.cookies['usuario'];
   var post=req.body.idPost;

    controller.nuevoComment(req.params.contenido ,req.params.idpost, req.params.username , function (err, likes) {
        if (err) {
            res.status(500);
            res.end();
            console.log("ño lo cree");
        } else {

            //console.log(likes);
            console.log("Hice un comment");

            //res.json(likes);

        }
    });
});

module.exports = router;
