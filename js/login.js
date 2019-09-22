$(document).ready(function() {
    $(".loading").hide();
    $('#inputusername').val("");
    $('#inputpassword').val();
});


$("#loginbtn").click(function() {
    $(".loading").show();
    var username = $('#inputusername').val();
    var password = $('#inputpassword').val();
    console.log(username);
    console.log(password);
    console.log("login clicked");
    $.ajax({
        url: "http://13.235.100.235:8000/api-token-auth/",
        type: 'POST',
        data: {
            "username": username,
            "password": password
        },
        beforeSend: function() {},
        dataType: 'json',
        success: function(res) {
            $(".loading").hide();
            console.log('login successfull')
            console.log(res.token)
            localStorage.setItem("TokenFile", res.token)
            M.toast({ html: 'Login successfull', classes: 'rounded green' })
            window.location.href = "districts.html"
        },
        error: function(e) {
            $(".loading").hide();
            console.log(e);
            M.toast({ html: 'Login failed!!.Please Try Again', classes: 'rounded red' });
        }
    });
});