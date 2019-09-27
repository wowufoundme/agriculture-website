$(document).ready(function() {
    $(".loading").hide();
    $('#ddaname').val("");
    $('#ddaphone').val("");
    $('#ddaemail').val("");
    $('#ddapassword').val("");
    $('#ddausername').val("");
    $('select').val("default");
    $('select').html("")
    $('select').append(`<option value="default" disabled selected>Choose District</option>`)
    $.ajax({
        url: "http://13.235.100.235:8000/api/district/",
        type: 'GET',
        headers: {
            'Authorization': 'Token a5ed9f187e22c861262a5e5a37eaed92a6c84c0c'
        },
        async: false,
        dataType: 'json',
        success: function(res) {
            if (res.length > 0) {
                res.map(item => {
                    row = `
                    <option value="${item.id}">${item.district}</option>
                    `
                    $('select').append(row)
                })
            }
            $('select').formSelect();
        },
        error: function(e) {
            console.log(e);
            $('select').formSelect();
        }
    });
});



$("#ddasignupbtn").click(function() {
    $(".loading").show();
    var name = $('#ddaname').val();
    var number = $('#ddaphone').val();
    var email = $('#ddaemail').val();
    var password = $('#ddapassword').val();
    var username = $('#ddausername').val();
    // var district = $('#ddadistrict').val();
    var district = $('select').val();
    var type = 'dda'
    $.ajax({
        url: "http://13.235.100.235:8000/api/user/",
        type: 'POST',
        headers: {
            'Authorization': 'Token a5ed9f187e22c861262a5e5a37eaed92a6c84c0c'
        },
        data: {
            "name": name,
            "number": number,
            "email": email,
            "username": username,
            "password": password,
            "type_of_user": type,
            "district": district,
        },
        dataType: 'json',
        beforeSend: function() {},
        success: function(res) {
            console.log('Registration successfull')
            $(".loading").hide();
            M.toast({ html: 'DDA Registered succesfully!!', classes: 'rounded green' });
            $('#ddaname').val("");
            $('#ddaphone').val("");
            $('#ddaemail').val("");
            $('#ddapassword').val("");
            $('#ddausername').val("");
            $('select').val("default");
            $('select').html("")
            $('select').append(`<option value="default" disabled selected>Choose District</option>`)
        },
        error: function(e) {
            console.log(e);
            M.toast({ html: 'Some error occured.Unable to register', classes: 'rounded red' })
        }
    });
});