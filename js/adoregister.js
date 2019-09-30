$(document).ready(function() {
    $(".loading").hide();
    $('#adoname').val("");
    $('#adophone').val("");
    $('#adoemail').val("");
    $('#adopassword').val("");
    $('#adousername').val("");
    $('#select-village').val("default");
    $('#select-village').html("")
    $('#select-village').append(`<option value="default" disabled selected>Choose Village</option>`)

    $('#selectdda').val("default");
    $('#selectdda').html("");
    $('#selectdda').append(`<option value="default" disabled selected>Choose DDA</option>`)

    $.ajax({
        url: "http://13.235.100.235/api/village/",
        type: 'GET',
        async: false,
        dataType: 'json',
        success: function(res) {
            if (res.length > 0) {
                res.map(item => {
                    row = `
                    <option value="${item.id}">${item.village}</option>
                    `
                    $('#select-village').append(row)
                })
            }
            console.log("villages loaded")
            $('#select-village').formSelect();
        },
        error: function(e) {
            console.log(e);
            $('#select-village').formSelect();
        }
    });

    $.ajax({
        url: "http://13.235.100.235/api/user/dda/",
        type: 'GET',
        async: false,
        dataType: 'json',
        success: function(res) {
            if (res.length > 0) {
                res.map(item => {
                    row = `
                    <option value="${item.id}">${item.name}</option>
                    `
                    $('#selectdda').append(row)
                })
            }
            console.log("dda list loaded")
            $('#selectdda').formSelect();
        },
        error: function(e) {
            console.log(e);
            $('#selectdda').formSelect();
        }
    });
});

$("form").on("submit", function sub(event) {
    event.preventDefault();
    var name = $('#adoname').val();
    var number = $('#adophone').val();
    var email = $('#adoemail').val();
    var password = $('#adopassword').val();
    var username = $('#adousername').val();
    var village = $('select').val();
    var dda = $('#selectdda').val();
    console.log(village)
    var type = 'ado'
    data = {
        'name': name,
        'number': number,
        'email': email,
        'username': username,
        'password': password,
        'type_of_user': type,
        'village': village.map(id => (parseInt(id))),
        'dda': parseInt(dda)
    }

    var pattern = /(7|8|9)\d{9}$/;
    $('#adophone').next('#error').remove();

    if (name == "" && number == "" && email == "" && username == "" && password == "") {
        $('#adoname').focus();
        console.log("validating")
    }

    if (!number.match(pattern) || !number.length >= 10 || (!number.match(pattern) && number.length == 10)) {

        console.log("number invalid")
        $('#adophone').focus();
        $('#adophone').after("<span id='error' style='color:red; margin-bottom: 20px;'>Please enter a valid number</span>")
        $('#adophone').css('color', '#FF0000');
        return false;
    } else {
        $('#adosignupbtn').html("Please wait..").attr('disabled', true);
        $('#adophone').removeAttr('style')
        $('#adophone').next('#error').remove();
        $(".loading").show();
        $.ajax({
            url: "http://13.235.100.235/api/user/",
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data),
            processData: false,
            beforeSend: function(res) { console.log(res) },
            success: function(res) {
                console.log('Registration successfull')
                $(".loading").hide();
                M.toast({ html: 'ADO Registered succesfully!!', classes: 'rounded green' });
                window.location.reload();
            },
            error: function(e) {
                console.log(e);
                $(".loading").hide();
                M.toast({ html: 'Some error occured.Unable to register', classes: 'rounded red' })
            }
        });
    }

})

// $("#adosignupbtn").click(function() {
//     $(".loading").show();
//     var name = $('#adoname').val();
//     var number = $('#adophone').val();
//     var email = $('#adoemail').val();
//     var password = $('#adopassword').val();
//     var username = $('#adousername').val();
//     var village = $('select').val();
//     var dda = $('#selectdda').val();
//     console.log(village)
//     var type = 'ado'
//     data = {
//         'name': name,
//         'number': number,
//         'email': email,
//         'username': username,
//         'password': password,
//         'type_of_user': type,
//         'village': village.map(id => (parseInt(id))),
//         'dda': parseInt(dda)
//     }
//     $.ajax({
//         url: "http://13.235.100.235/api/user/",
//         type: 'POST',
//         contentType: 'application/json',
//         data: JSON.stringify(data),
//         processData: false,
//         beforeSend: function(res) { console.log(res) },
//         success: function(res) {
//             console.log('Registration successfull')
//             $(".loading").hide();
//             M.toast({ html: 'ADO Registered succesfully!!', classes: 'rounded green' });
//             window.location.reload();
//         },
//         error: function(e) {
//             console.log(e);
//             M.toast({ html: 'Some error occured.Unable to register', classes: 'rounded red' })
//         }
//     });
// });