$(document).ready(function() {
    $('.sidenav').sidenav();
})


$('#logout').click(function() {
    localStorage.clear();
    M.toast({ html: 'Logout successfull', classes: 'rounded green' })
    window.location.href = "index.html";
})