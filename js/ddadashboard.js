$('#ddalogout').click(function() {
    localStorage.removeItem("DdaToken")
    M.toast({ html: 'Logout successfull', classes: 'rounded green' })
    window.location.href = "ddalogin.html";
})