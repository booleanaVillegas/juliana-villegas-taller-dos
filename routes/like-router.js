var express = require('express');
var router = express.Router();
var controller = require('../controllers/like-controller');
/* GET users listing. */
router.get('/:idpost', function(req, res, next) {
    controller.ObtenerPorPost(req.params.idpost, function (err, likes) {
        if (err) {
            res.status(500);
            res.end();
        } else {
          //  console.log("likes que llegaron");
           // console.log(likes);
            res.json(likes);

        }
    });
});
    router.post('/nuevo/:username/:idpost', function (req, res, next) {
        controller.nuevoLike(req.params.idpost, req.params.username , function (err, likes) {
            if (err) {
                res.status(500);
                res.end();
                console.log("ño lo cree");
            } else {

                //console.log(likes);
                console.log("Hice un like");

                //res.json(likes);

            }
        });
    });



module.exports = router;
