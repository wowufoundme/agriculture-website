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



$("form").on("submit", function sub(event) {
    event.preventDefault();
    var name = $('#ddaname').val();
    var number = $('#ddaphone').val();
    var email = $('#ddaemail').val();
    var password = $('#ddapassword').val();
    var username = $('#ddausername').val();
    // var district = $('#ddadistrict').val();
    var district = $('select').val();
    var type = 'dda';

    var pattern = /(7|8|9)\d{9}$/;
    $('#ddaphone').next('#error').remove();

    if (!number.match(pattern) || !number.length >= 10 || (!number.match(pattern) && number.length == 10)) {
        console.log("number invalid")
        $('#ddaphone').focus();
        $('#ddaphone').after("<span id='error' style='color:red; margin-bottom: 20px;'>Please enter a valid number</span>")
        $('#ddaphone').css('color', '#FF0000');
        return false;
    } else {
        $('#ddasignupbtn').html("Please wait..").attr('disabled', true);
        $('#ddaphone').removeAttr('style')
        $('#ddaphone').next('#error').remove();
        $(".loading").show();
        console.log("form valid")
        $.ajax({
            url: "http://13.235.100.235:8000/api/user/",
            type: 'POST',
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
                window.location.reload();
            },
            error: function(e) {
                console.log(e);
                $(".loading").hide();
                M.toast({ html: 'Some error occured.Unable to register', classes: 'rounded red' })
            }
        });
    }

});