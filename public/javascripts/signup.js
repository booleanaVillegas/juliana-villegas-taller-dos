if(document.cookie.length <= 0) {
    console.log("no tienes cookies");

}else{
    console.log("si tienes cookies");
    $(location).attr('href','/feed');
}
