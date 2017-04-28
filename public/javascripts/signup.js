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


    console.log("si tienes cookies");

    if(usuario.length>0) {
        $(location).attr('href', '/feed');
    }
}