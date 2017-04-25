var db = require('../database');

exports.validarUsuario = function(usuario,pass,callback){
var data = [usuario, pass];
    db.getConexion().query('SELECT * FROM users WHERE username=? AND password=?',data, function(err, results){
        if(!err){
            console.log("");
           // console.log(results);
            callback(false, results);
        }else{
            callback(err);
        }
    });
}
exports.consultarTodos = function(callback){

    db.getConexion().query('SELECT * FROM users', function(err, results){
        if(!err){
            console.log("");
            //console.log(results);
            callback(false, results);
        }else{
            callback(err);
        }
    });
}


exports.consultarUsuario = function(usuario,callback){

    db.getConexion().query('SELECT * FROM users WHERE username=?',usuario, function(err, results){
        if(!err){
            console.log("");
            //console.log(results);
            callback(false, results);
        }else{
            callback(err);
        }
    });
}


exports.nuevoUsuario = function(firstName,lastName,email,nickname,password,country,img,callback){

    var values = [firstName,lastName,password,email,nickname,country,img];
    db.getConexion().query('INSERT INTO users (first_name,last_name,password,email,username,country,profile_picture) VALUES (?,?,?,?,?,?,?)',
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

exports.obtenerUna = function(idPhoto){
    // Obtener una foto en particular;
}