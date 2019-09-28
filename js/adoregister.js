$(document).ready(function() {
    $(".loading").hide();
    $('#adoname').val("");
    $('#adophone').val("");
    $('#adoemail').val("");
    $('#adopassword').val("");
    $('#adousername').val("");
    $('select').val("default");
    $('select').html("")
    $('select').append(`<option value="default" disabled selected>Choose Village</option>`)

    $('#selectdda').val("default");
    $('#selectdda').html("");
    $('#selectdda').append(`<option value="default" disabled selected>Choose DDA</option>`)

    $.ajax({
        url: "http://13.235.100.235:8000/api/village/",
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
                    <option value="${item.id}">${item.village}</option>
                    `
                    $('select').append(row)
                })
            }
            console.log("villages loaded")
            $('select').formSelect();
        },
        error: function(e) {
            console.log(e);
            $('select').formSelect();
        }
    });

    $.ajax({
        url: "http://13.235.100.235:8000/api/user/dda/",
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


$("#adosignupbtn").click(function() {
    $(".loading").show();
    var name = $('#adoname').val();
    var number = $('#adophone').val();
    var email = $('#adoemail').val();
    var password = $('#adopassword').val();
    var username = $('#adousername').val();
    var village = $('select').val();
    var dda = $('#selectdda').val();
    console.log(village)
        // var array = [];
        // $("select").each(function() {
        //     array.push($(this).val());
        // });
        // console.log(array);
    var type = 'ado'
    data = {
            'name': name,
            'number': number,
            'email': email,
            'username': username,
            'password': password,
            'type_of_user': type,
            'village': village.map(id=>(parseInt(id))),
            'dda': parseInt(dda)
        },
    console.log(data)
    $.ajax({
        url: "http://13.235.100.235:8000/api/user/",
        type: 'POST',
        headers: {
            'Authorization': 'Token a5ed9f187e22c861262a5e5a37eaed92a6c84c0c'
        },
        contentType: 'application/json',
        data: JSON.stringify(data),
        processData: false,
        beforeSend: function(res) {console.log(res)},
        success: function(res) {
            console.log('Registration successfull')
            $(".loading").hide();
            M.toast({ html: 'ADO Registered succesfully!!', classes: 'rounded green' });
            $('#adoname').val("");
            $('#adophone').val("");
            $('#adoemail').val("");
            $('#adopassword').val("");
            $('#adousername').val("");
            $('select').val("default");
            $('select').html("")
            $('select').append(`<option value="default" disabled selected>Choose Village</option>`)

            $('#selectdda').val("default");
            $('#selectdda').html("");
            $('#selectdda').append(`<option value="default" disabled selected>Choose DDA</option>`)
        },
        error: function(e) {
            console.log(e);
            M.toast({ html: 'Some error occured.Unable to register', classes: 'rounded red' })
        }
    });
});