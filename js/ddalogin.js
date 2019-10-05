$(document).ready(function() {
    console.log("loaded")
    $(".loading").hide();
    $('#inputusername').val("");
    $('#inputpassword').val("");
});


$("form").on("submit", function sub(event) {
    event.preventDefault();
    var username = $('#inputusername').val();
    var password = $('#inputpassword').val();
    $.ajax({
        url: "http://18.224.202.135/api-token-auth/",
        type: 'POST',
        data: {
            "username": username,
            "password": password
        },
        beforeSend: function() {
            console.log("in before send")
        },
        dataType: 'json',
        beforeSend: function() {
            $(".loading").show();
        },
        success: function(res) {
            $(".loading").hide();
            console.log('login successfull')
            localStorage.setItem("TokenFile", res.token)
            M.toast({ html: 'Login successfull', classes: 'rounded green' })
            window.location.href = "ddahome.html"
        },
        error: function(e) {
            $(".loading").hide();
            console.log(e);
            alert("Incorrect username or password. Please try again..");
            M.toast({ html: 'Login failed!!.Please Try Again', classes: 'rounded red' });
        }
    });
})