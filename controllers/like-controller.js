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

exports.nuevoLike = function(idpost,username,callback){

    var values = [username,idpost];
    db.getConexion().query('INSERT INTO likes (username,id_post) VALUES (?,?)',
        values,
        function(err, result){
            if(err){
                callback(err);
            }else{
                callback(false, result.insertId);
            }
        }
    );

}