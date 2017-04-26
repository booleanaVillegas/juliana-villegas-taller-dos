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


exports.nuevoPost = function(description,username,image,callback){

    var values = [description,username,image];
    db.getConexion().query('INSERT INTO posts (description,username,image) VALUES (?,?,?)',
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