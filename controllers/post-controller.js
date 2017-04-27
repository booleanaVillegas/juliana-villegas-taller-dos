var db = require('../database');

exports.ObtenerTodos = function(callback){

    db.getConexion().query('SELECT * FROM posts', function(err, results){
        if(!err){
            console.log("");
           // console.log(results);
            callback(false, results);
        }else{
            callback(err);
        }
    });
}


exports.nuevoPost = function(image,username,description,callback){

    var values = [image,username,description];
    db.getConexion().query('INSERT INTO posts (image,username,description) VALUES (?,?,?)',
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