$('#ddalogout').click(function() {
    localStorage.clear();
    M.toast({ html: 'Logout successfull', classes: 'rounded green' })
    window.location.href = "ddalogin.html";
})