/**
 * Created by Juliana on 22/04/2017.
 */
$(document).ready(function () {

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

    if(document.cookie.length <= 0 || usuario.length==0) {
        console.log("no tienes cookies");
        $(location).attr('href', '/');
    }

    obtenerUsuario(usuario).done(function (respuesta) {
        usuario = respuesta[0].username;


        $(".user-img").css({

         "background-image": "url(../uploads/"+respuesta[0].profile_picture+")",
         // "background-image": "url(../uploads/"+1+".jpg)"

         });

        //$(".user-img").attr("src", "../uploads/" + respuesta[0].profile_picture);
        $(".user-name").text(usuario);
    });


    obtenerPosts().done(function (respuesta) {
        var galeria = $('.todos-post');
        $.each(respuesta, function (index, value) {

            obtenerLikes(value.id_post).done(function (nlikes) {
                var numlikes = nlikes.length;
                obtenerComments(value.id_post).done(function (ncomments) {
                    var numcomments = ncomments.length;
                    obtenerUsuario(value.username).done(function (user) {

                        var article = $("<article>", {"class": "post col-6 offset-3 col-10-s offset-1-s"});
                        var header = $("<div>", {"class": "header-post col-12 dev-center"});
                        var figure = $("<figure>", {"class": "col-1 col-2-s"});
                        var imgUser = $("<img>", {"src": "../uploads/" + user[0].profile_picture, "alt": "", "class": "user-post-img col-12 col-10-s"
                        });
                        var content = $("<content>", {"class": "col-10  col-7-s"});
                        var nombreUser = $("<h2>" + value.username + "</h2>", {"class": "col-4 col-12-s user-post-name"});
                        var description = $("<p>" + value.description + "</p>", {"class": "col-12 user-post-content"});
                        var figureDos = $("<figure>", {"class": "col-12 post-img"});
                        var imagePost = $("<img>", {"src": "../uploads/" + value.image, "alt": "", "class": "col-12"});
                        var comLik = $("<div>", {"class": "com-lik"});
                        var comments = $("<h2>" + "Comments" + "</h2>").attr("class", "col-6 toggle-" + index);
                        var spanComments = $("<span>" + "(" + numcomments + ")" + "</span>").attr("class", "n-coments");
                        var likes = $("<h2>" + "Likes" + "</h2>").attr("class", "col-6 click-likes-" + value.id_post + "");
                        var spanLikes = $("<span>" + "(" + numlikes + ")" + "</span>").attr("class", "n-likes");
                        var toggleBox = $("<div>", {"class": "dev-center-vertical contenido-toggle contenido-toggle-" + index});


                        var boxComment = $("<div>", {"class": "box-comment col-12"});

                      //  var form = $("<form>"+"</form>").attr({ class:"col-12 col-10-s", method:"post",action:"/comments" });

                       var form = document.createElement("form");
                    form.setAttribute('class','col-12 col-10-s');
                     form.setAttribute('method',"post");
                  form.setAttribute('action',"/comments/nuevo/"+value.id_post);
                   //form.attr({ class:"col-12 col-10-s", method:"post",action:"/comments" });

                        var i = document.createElement("input"); //input element, text
                        i.setAttribute('class',"col-10");
                        i.setAttribute('type',"comment");
                        i.setAttribute('name',"comment");
                        i.setAttribute('placeholder',"What do you think?");
                        i.setAttribute('autocomplete',"off");
                        var s = document.createElement("button"); //input element, Submit button
                        s.setAttribute('class',"fa fa-paper-plane col-1");
                        s.setAttribute('aria-hidden',"true");

                        form.appendChild(i);
                        form.appendChild(s);


                        galeria.append(article);
                        article.append(header);
                        header.append(figure);
                        figure.append(imgUser);
                        header.append(content);
                        content.append(nombreUser);
                        content.append(description);
                        article.append(figureDos);
                        figureDos.append(imagePost);
                        article.append(comLik);
                        comLik.append(comments);
                        comLik.append(likes);
                        comments.append(spanComments);
                        likes.append(spanLikes);
                        article.append(toggleBox);
                        article.append(boxComment);
                        boxComment.append(form);
                        $.each(ncomments, function (index, valor) {
                            obtenerUsuario(valor.username).done(function (userComment) {
                                var userComImg=$("<div>",{"class":"img-post-user img-post-user"+value.id_post+index});

                                toggleBox.append(userComImg);
                               // console.log(userComment[0].username);
                               /* $(".img-post-user").css({
                                    "background-image": "url(../uploads/"+userComment[0].profile_picture+")",
                                   // "background-image": "url(../uploads/"+1+".jpg)"

                                });*/

                                $(".img-post-user"+value.id_post+index).css({
                                    "background-image": "url(../uploads/"+userComment[0].profile_picture+")",
                                    // "background-image": "url(../uploads/"+1+".jpg)"

                                });


                               // console.log(+userComment[index].username);
                                var nameUserPost = $("<h1>" + valor.username + ": " + "</h1>");
                                toggleBox.append(nameUserPost);
                                var descriptionUserPost = $("<p>" + valor.content + "<br><hr><br>" + "</p>");
                                toggleBox.append(descriptionUserPost);

                            });
                        });

                        $(".contenido-toggle-" + index).hide();
                        $(".toggle-" + index).click(function () {
                            $(".contenido-toggle-" + index).slideToggle("fast");
                        });

                        $(".click-likes-" + value.id_post).click(function () {
                            //console.log(value.id_post);
                            agregarLike(usuario, value.id_post);
                        });

                    });
                });
            });

        });
    });

    /*  $( ".n-coments" ).each(function( index ) {
     $(".contenido-toggle-"+index).hide();
     $(".toggle-"+index).click(function(){
     $(".contenido-toggle-"+index).slideToggle("fast");
     });
     });


     */

});

function obtenerPosts() {

    return $.ajax({
        url: "/posts",
        type: "get",
        dataType: "json"
    });
}

function obtenerLikes(idPost) {
    return $.ajax({
        url: "/likes/" + idPost,
        type: "get",
        dataType: "json",
    });
}

function obtenerComments(idPost) {
    return $.ajax({
        url: "/comments/" + idPost,
        type: "get",
        dataType: "json"
    });
}

function obtenerUsuario(username) {
    return $.ajax({
        url: "/users/" + username,
        type: "get",
        dataType: "json"
    });
}

function agregarLike(username, post) {
    return $.ajax({
        url: "/likes/nuevo/" + username + "/" + post + "",
        type: "post",
        dataType: "json"
    });
}