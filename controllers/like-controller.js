var db = require('../database');

exports.ObtenerPorPost = function(idpost,callback){

    db.getConexion().query('SELECT * FROM likes WHERE id_post=?',idpost, function(err, results){
        if(!err){
            console.log("");
            //console.log(results);
            callback(false, results);
        }else{
            callback(err);
        }
    });
}