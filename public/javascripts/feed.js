/**
 * Created by Juliana on 22/04/2017.
 */
$(document).ready(function(){

    function getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for(var i = 0; i < ca.length; i++) {
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
  
var  usuario=getCookie("usuario");


   obtenerUsuario(usuario).done(function (respuesta) {
     usuario =respuesta[0].username;
       console.log(usuario);

       $(".user-name").text(usuario);
   });



    
    obtenerPosts().done(function(respuesta){
        var galeria = $('.todos-post');
        $.each(respuesta, function(index,value){
     obtenerLikes(value.id_post).done(function(nlikes){
var numlikes= nlikes.length;
obtenerComments(value.id_post).done(function(ncomments){
 var   numcomments= ncomments.length;








            var article = $("<article>",{"class":"post col-6 offset-3 col-10-s offset-1-s"});
            var header = $("<div>",{"class":"header-post col-12 dev-center"});
            var figure = $("<figure>",{"class":"col-1 col-3-s"});
            var imgUser = $("<img>",{"src":"./img/profile.png","alt":"","class":"user-post-img col-12"});
            var content= $("<content>", {"class":"col-10  col-7-s"});
            var nombreUser = $("<h2>"+value.username+"</h2>", {"class":"col-4 user-post-name"});
            var description = $("<p>"+value.description+"</p>", {"class":"col-12 user-post-content"});
            var figureDos= $("<figure>",{"class":"col-12 post-img"});
            var imagePost= $("<img>",{"src":"../uploads/"+value.image,"alt":"","class":"col-12"});
            var comLik= $("<div>",{"class":"com-lik"});
            var comments = $("<h2>"+"Comments"+"</h2>").attr("class","col-6 toggle-"+index);
            var spanComments= $("<span>"+"("+numcomments+")"+"</span>").attr("class","n-coments");
            var likes = $("<h2>"+"Likes"+"</h2>").attr("class","col-6");
            var spanLikes= $("<span>"+"("+numlikes+")"+"</span>").attr("class","n-likes");
            var toggleBox= $("<div>",{"class":"contenido-toggle contenido-toggle-"+index});



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
    $.each(ncomments, function( index, value ) {
        var nameUserPost =$("<h1>"+value.username+": "+"</h1>");
        toggleBox.append(nameUserPost);
        var descriptionUserPost =$("<p>"+value.content+"<br><hr><br>"+"</p>");
        toggleBox.append(descriptionUserPost);
    });


    $(".contenido-toggle-"+index).hide();
    $(".toggle-"+index).click(function(){
        $(".contenido-toggle-"+index).slideToggle("fast");
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

function obtenerPosts(){

    return $.ajax({
        url:"http://localhost:3000/posts",
        type:"get",
        dataType: "json"
    });
}

function obtenerLikes(idPost){
   return $.ajax({
        url:"http://localhost:3000/likes/"+idPost,
        type:"get",
        dataType: "json",
    });
}

function obtenerComments(idPost){
    return $.ajax({
        url:"http://localhost:3000/comments/"+idPost,
        type:"get",
        dataType: "json"
    });
}

function obtenerUsuario(username){
    return $.ajax({
        url:"http://localhost:3000/users/"+username,
        type:"get",
        dataType: "json"
    });



}