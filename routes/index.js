var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/signup', function(req, res, next) {

        var ruta = __dirname.split("routes");
        res.sendFile(ruta[0] + '/public/signup.html');

 //res.sendFile('C:/Users/Juliana/WebstormProjects/juliana-villegas-taller-dos/public/signup.html');
});

router.get('/login', function(req, res, next) {

    var ruta = __dirname.split("routes");
    res.sendFile(ruta[0] + '/public/login.html');

    //res.sendFile('C:/Users/Juliana/WebstormProjects/juliana-villegas-taller-dos/public/signup.html');
});

router.get('/feed', function(req, res, next) {
    res.clearCookie("error");
        var ruta = __dirname.split("routes");
        res.sendFile(ruta[0] + '/public/feed.html');

    //res.sendFile('C:/Users/Juliana/WebstormProjects/juliana-villegas-taller-dos/public/signup.html');
});

router.get('/logout', function(req, res, next) {

  res.clearCookie("usuario");
    res.clearCookie("error");
    //cookies.set('usuario', {expires: Date.now()});
    res.redirect("/");
});

module.exports = router;
