/**
 * Created by Juliana on 22/04/2017.
 */
if(document.cookie.length <= 0) {
    console.log("no tienes cookies");

}else{
    function getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    var usuario = getCookie("usuario");
    var errorC = getCookie("error");

    console.log(errorC);


    if(usuario.length>0) {
        $(location).attr('href', '/feed');
    }
    if(errorC.length>0) {
        $(".error").text("Usuario o contraseña incorrecta");
    }
}