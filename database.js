var mysql = require('mysql');
var pool = null;

exports.conectar = function(done){
    pool = mysql.createPool({
        host:'200.3.193.22',
        user:'P09652_1_18',
        password:'F6f3UDCF',
        database:'P09652_1_18'
    });

    done(false);
}

exports.getConexion = function(){
    return pool;
}