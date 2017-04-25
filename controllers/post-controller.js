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