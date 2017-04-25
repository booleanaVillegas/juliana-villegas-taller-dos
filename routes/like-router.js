var express = require('express');
var router = express.Router();
var controller = require('../controllers/like-controller');
/* GET users listing. */
router.get('/:idpost', function(req, res, next) {
    controller.ObtenerPorPost( req.params.idpost, function(err,likes){
        if(err){
            res.status(500);
            res.end();
        }else{
            console.log("likes que llegaron");
            console.log(likes);
            res.json(likes);

        }
    });
});



module.exports = router;
