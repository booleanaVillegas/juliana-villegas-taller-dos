var express = require('express');
var router = express.Router();
var controller = require('../controllers/user-controller');
/* GET users listing. */



router.get('/', function(req, res, next) {


    controller.consultarTodos(function(err,users){
        if(err){
            res.status(500);
            res.end();
        }else{
            console.log("users que llegaron");
        //    console.log(users);

            res.json(users);
        }
    });

});


router.post('/posts/', function (req, res, next) {
    var user= req.body.username;
    var pass= req.body.password;
res.redirect("/users/"+user+"/"+pass);


});

//'/new/:name/:lastname/:email/:usuario/:pass/:nation/:img

//zoe/villegas/z@z.com/zoe-cat/gatos/colombia
///new/name/:name/lastname/:lastname/email/:email/usuario/:usuario/pass/:pass/nation/:nation/img/:img
router.post('/new-user/', function(req, res, next) {
     console.log("entre");
     var name=req.body.name;
     var lastname=req.body.lastname;
     var email=req.body.mail;
     var usuario=req.body.usuario;
     var pass=req.body.pass;
     var nation=req.body.nation;
     var img= null;


       controller.nuevoUsuario(name,lastname,email,usuario,pass,nation,img,function(err,registraste){
     if(err){
     res.status(500);
     res.end();
     }else{
     console.log("registre");


     res.redirect("/login");
     //res.json(registraste);

     }
     });
});

/*
app.post('/login', function(req,res){
    if(req.body.usuario==='admin' && req.body.clave==='no_hacer_esto_en_produccion'){
        req.session.loggued = req.body.usuario;
        res.end("Ingreso correcto <a href='/menu'>seguir</a>");
    }else{
        res.end(401, "Ingreso incorrecto <a href='/login'>reintentar</a>");
    }
});
*/
/*
app.get('/login',function(req,res){
    res.end(
        "<form method=post action='/login'>"+
        "usuario<input name=usuario><br>"+
        "clave<input name=clave><br>"+
        "<input type=submit value='entrar'></form>"
    );
});
*/


router.get('/:usuario/:pass', function(req, res, next) {
    controller.validarUsuario(req.params.usuario,req.params.pass,function(err,users){
                if(err){
                    res.status(500);
                    res.end();
                }else{
                    console.log("users que llegaron");
                    if(users.length>0) {
                      //  console.log(users);
                        res.cookie('usuario', req.params.usuario);
                        res.redirect("/feed");
                       //res.json(users);

                    }else {
                        console.log("usuario o contraseña incorrecto");
                        //res.send("nope")
                        res.status(500);
                    }

        }
    });
});


router.get('/:usuario', function(req, res, next) {
    console.log(req.cookies['usuario']);
    if(req.params.usuario==req.cookies['usuario']){
controller.consultarUsuario(req.params.usuario,function(err,users){
    if(err){
        res.status(500);
        res.end();
    }else{
        //console.log("users que llegaron");

            res.json(users);}}
        )
    }else {

        res.json("No iniciaste sesión");
    }
    //res.sendFile('C:/Users/Juliana/WebstormProjects/juliana-villegas-taller-dos/public/signup.html');
});




module.exports = router;
