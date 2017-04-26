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

module.exports = router;
