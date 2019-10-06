// if (localStorage.getItem("TokenFile") != null) {
//     console.log("in if")
//     window.location.href = "disricts.html"
// }

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
        dataType: 'json',
        beforeSend: function() {
            $(".loading").show();
        },
        success: function(res) {
            checkadmin(res.token)
        },
        error: function(e) {
            $(".loading").hide();
            console.log(e);
            alert("Invalid username or password. Please try again..");
            M.toast({ html: 'Login failed!!.Please Try Again', classes: 'rounded red' });
        }
    });
})


function checkadmin(token) {
    $.ajax({
        url: "http://18.224.202.135/api/get-user/",
        type: 'GET',
        headers: {
            'Authorization': 'Token ' + token
        },
        dataType: 'json',
        beforeSend: function() {
            $(".loading").show();
        },
        success: function(res) {
            var type = res.auth_user.type_of_user
            if (type == "admin") {
                $(".loading").hide();
                console.log('login successfull')
                localStorage.setItem("TokenFile", token)
                M.toast({ html: 'Login successfull', classes: 'rounded green' })
                window.location.href = "districts.html"
            } else {
                $(".loading").hide();
                alert("Invalid username or password. Please try again..");
                M.toast({ html: 'Login failed!!.Please Try Again', classes: 'rounded red' });
            }
        },
        error: function(e) {
            $(".loading").hide();
            console.log(e);
            alert("Some error ocuured. Please try again..");
            M.toast({ html: 'Login failed!!.Please Try Again', classes: 'rounded red' });
        }
    });
}