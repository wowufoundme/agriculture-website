$(document).ready(function() {
    $(".loading").hide();
    console.log("loaded")
    if (localStorage.getItem("TokenFile") != null) {
        console.log("in if")
        window.location.href = "disricts.html"
    } else {
        console.log("in else")
        $(".loading").hide();
        $('#inputusername').val("");
        $('#inputpassword').val("");
    }

});


// $("#loginbtn").click(function() {

$("form").on("submit", function sub(event) {
    event.preventDefault();
    var username = $('#inputusername').val();
    var password = $('#inputpassword').val();
    $.ajax({
        url: "http://13.235.100.235:8000/api-token-auth/",
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
            window.location.href = "districts.html"
        },
        error: function(e) {
            $(".loading").hide();
            console.log(e);
            alert("Incorrect username or password. Please try again..");
            M.toast({ html: 'Login failed!!.Please Try Again', classes: 'rounded red' });
        }
    });
})

// if (username == "" && password != "") {
//     console.log("no username")
//     $('#inputpassword').next("div").remove();
//     $('#inputusername').after("<span style='color:red;margin-bottom: 20px;'>*required</span>")
// } else if (password == "" && username != "") {
//     console.log("no password")
//     $('#inputusername').next("div").remove();
//     $('#inputpassword').after("<span style='color:red;margin-bottom: 20px;'>*required</span>")
// } else if (username == "" && password == "") {
//     console.log("both")
//     $('#inputusername').after("<div style='color:red;margin-bottom: 20px;'>*required</div>")
//     $('#inputpassword').after("<div style='color:red;margin-bottom: 20px;min-height: 20px;'>*required</div>")
// } else {

// }


// });