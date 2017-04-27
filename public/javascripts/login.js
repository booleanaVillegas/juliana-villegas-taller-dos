/**
 * Created by Juliana on 22/04/2017.
 */
function validarUsuario(username,contaseña){
    return $.ajax({
        url:"/users/"+username+"/"+contaseña+"",
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

if(document.cookie.length <= 0) {
    console.log("no tienes cookies");

}else{
    console.log("si tienes cookies");
    $(location).attr('href','/feed');
}