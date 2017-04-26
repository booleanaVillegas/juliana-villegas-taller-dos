/**
 * Created by Juliana on 22/04/2017.
 */
function validarUsuario(username,contaseña){
    return $.ajax({
        url:"http://localhost:3000/users/"+username+"/"+contaseña+"",
        type:"get",
        dataType: "json"
    });
}

$(".btn").click(function(){
    var user = $('#user-login').val();
    var pass = $('#pass-login').val();
    validarUsuario(user,pass).done(function(respuesta){
     $(".text-err").text(respuesta);
    });
});