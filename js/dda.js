// get data for specified page
var token = localStorage.getItem("TokenFile")

$(document).ready(function() {
    if (token == null) {
        window.location.href = "index.html"
    } else {
        $('.sidenav').sidenav();
        $('.modaladd').modal();
        $('.modaledit').modal();
        $('.modaldelete').modal();
        $('.modalbulk').modal();
        $(document).ready(function() {
            $('select').formSelect();
        });
        $('select').append(`<option value="default" disabled selected>Choose District</option>`)
        $.ajax({
            url: "http://18.224.202.135/api/district/",
            type: 'GET',
            // headers: {
            //     'Authorization': 'Token ' + token
            // },
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
        if ($(window).width() < 640 && $(window).width() > 320) {

            // $('a').remove();
            $('#addbtnid').html('<a id="addbutton" class="waves-effect blue lighten-1 waves-light btn modal-trigger" data-target="addDda">Add</a>')
            $('#addbulkbtnid').html('<a id="addbulkbutton" class="waves-effect blue lighten-1 waves-light btn modal-trigger" data-target="addBulk">AddBulk</a>')
            console.log("width less than 600");
        }

        getData();
    }

});

function getData(page = 1, search = "") {
    if (page !== 1)
        url = `http://18.224.202.135/api/users-list/dda/?search=${search}&page=${page}`
    else
        url = `http://18.224.202.135/api/users-list/dda/?search=${search}`
    $.ajax({
        url: url,
        type: 'GET',
        headers: {
            'Authorization': 'Token ' + token
        },
        async: false,
        dataType: 'json',
        beforeSend: function() {
            $(".pagination").html("");
            $("tbody").html("");
            $(".loading").show();
        },
        success: function(res) {
            if (res.results.length > 0) {
                res.results.map(item => {
                    row = `
                		<tr key=${item.auth_user.pk}>
                            <td>${res.results.indexOf(item) + (page-1)*20 + 1}</td>
                            <td id="title">${item.name}</td>
                            <td id="district">${item.district==null ? "" : item.district.district}</td>
                            <td id="number">${item.number}</td>
                            <td id="email">${item.email}</td>
                            <td>
                                <a id="editbutton" class="btn waves-effect waves-light modal-trigger" data-target="editDda"><i class="large material-icons left">edit</i>Edit</a>
                                <a id="deletebutton" class="btn red waves-effect modal-trigger" data-target="deleteDda"><i class="material-icons left">delete</i>DELETE</a>
                            </td>
                        </tr>
                	`
                    $('tbody').append(row)
                })
                arrow_left_enabled =
                    `
                    <li id="left" class="waves-effect">
                        <a>
                            <i class="material-icons">chevron_left</i>
                        </a>
                    </li>
                `
                if (page !== 1) {
                    $('.pagination').append(arrow_left_enabled);
                }
                for (var i = 0; i < res.count / 20; i++) {
                    page_tab = `<li id="page-tab" class="waves-effect"><a>${i+1}</a></li>`
                    active_tab = `<li id="page-tab" class="active"><a>${i+1}</a></li>`
                    if (i === page - 1) {
                        $('.pagination').append(active_tab);
                    } else {
                        $('.pagination').append(page_tab);
                    }
                }

                if (res.count > 20 && page - 1 !== parseInt(res.count / 20)) {
                    arrow_right = `
                        <li id="right" class="waves-effect">
                            <a>
                                <i class="material-icons">chevron_right</i>
                            </a>
                        </li>
                    `
                    $('.pagination').append(arrow_right)
                }

            } else {
                $('table').after('<center>No Data Available</center>')
            }
            $(".loading").hide();
        },
        error: function(e) {
            console.log(e);
        }
    });
}

$('#searchdda').keypress(function(event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {
        input = $("#searchdda");
        filter = input.val()
        var id = $('#page-tab').children('a').html()
        console.log(id)
        console.log(filter)
        getData(parseInt(id), filter);
    }

})


// pagination handle functions
$(document).on("click", "#page-tab", function() {
    // get id of the row clicked
    var id = $(this).children('a').html()
    input = $("#searchvillage");
    filter = input.val()
    getData(parseInt(id), filter);
});

// left arrow
$(document).on("click", "#left", function() {
    // get id of the row clicked
    var id = $(this).siblings('.active').children('a').html();
    input = $("#searchvillage");
    filter = input.val()
    getData(parseInt(id) - 1, filter);
});

// right arrow
$(document).on("click", "#right", function() {
    // get id of the row clicked
    var id = $(this).siblings('.active').children('a').html();
    input = $("#searchvillage");
    filter = input.val()
    getData(parseInt(id) + 1, filter);
});



// add functions
$(document).on("click", "#addbutton", function() {
    console.log("#addbutton");
    $('#ddaText').val("");
    $('#ddaNumber').val("");
    $('#ddaEmail').val("");
    $('#ddaUsername').val("");
    $('#ddaPassword').val("");
    $('select').val("default");
    // re-initialize material-select
    $('select').append(`<option value="default" disabled selected>Choose District</option>`)
})


$("#addform").on("submit", function sub(event) {
    console.log("hello")
    event.preventDefault();
    var number = $('#ddaNumber').val();
    var name = $('#ddaText').val();

    var email = $('#ddaEmail').val();
    var password = $('#ddaPassword').val();
    var username = $('#ddaUsername').val();
    var district = $('select').val();
    var type = 'dda'

    var pattern = /(7|8|9)\d{9}$/;
    $('#ddaNumber').next('#error').remove();

    if (!number.match(pattern) || !number.length >= 10 || (!number.match(pattern) && number.length == 10)) {
        console.log("number invalid")
        console.log(number.match(pattern))
        $('#ddaNumber').focus();
        $('#ddaNumber').after("<span id='error' style='color:red; margin-bottom: 20px;'>Please enter a valid number</span>")
        $('#ddaNumber').css('color', '#FF0000');
        return false;
    } else {
        // $('#addid').html("Please wait..").attr('disabled', true);
        $('#ddaNumber').removeAttr('style')
        $('#ddaNUmber').next('#error').remove();
        $(".loading").show();
        console.log("form valid")
        $.ajax({
            url: "http://18.224.202.135/api/user/",
            type: 'POST',
            headers: {
                'Authorization': 'Token ' + token
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
            async: true,
            dataType: 'json',
            beforeSend: function() {
                $(".loading").show();
                $("tbody").html("");
                $(".pagination").html("");
            },
            success: function(res) {
                console.log('add successfull')
                $(".loading").hide();
                $(".modal").modal('hide')
                console.log(res)
                getData();
                M.toast({ html: 'DDA added succesfully!!', classes: 'rounded green' })
            },
            error: function(e) {
                console.log(e);
                M.toast({ html: 'Some error occured.DDA not added!!', classes: 'rounded red' })
            }
        });
    }
})




// edit functions to set data in the fields of modal and make request
//set data when modal is shown
$(document).on("click", "#editbutton", function() {
    // get id of the row clicked
    var id = $(this).parent().parent().attr('key');
    var ddaname = $(this).parent().siblings('#title');
    var ddanumber = $(this).parent().siblings('#number');
    var ddaemail = $(this).parent().siblings('#email');
    console.log(id);
    console.log(ddaname);
    console.log(ddanumber);
    console.log(ddaemail);
    // set id of the row to the modal
    console.log(ddaemail.html());
    $("#editDda").attr("key", id);
    $('#ddaeditText').val(ddaname.html());
    console.log($('#ddaeditText').val());
    $('#ddaeditNumber').val(ddanumber.html());
    console.log($('#ddaeditNumber').val());
    $('#ddaeditEmail').val(ddaemail.html());
    console.log($('#ddaeditEmail').val());


    $('#ddaeditDistrict').val("default");
    console.log($('#ddaeditDistrict').val());
    // re-initialize material-select
    $('#ddaeditDistrict').html("")
    $('#ddaeditDistrict').append(`<option value="default" disabled selected>Choose District</option>`)
    $.ajax({
        url: "http://18.224.202.135/api/district/",
        type: 'GET',
        async: false,
        dataType: 'json',
        success: function(res) {
            if (res.length > 0) {
                res.map(item => {
                    row = `
                    <option value="${item.id}">${item.district}</option>
                    `
                    $('#ddaeditDistrict').append(row)
                })
            }
            console.log(res)
            $('#ddaeditDistrict').formSelect();
        },
        error: function(e) {
            console.log(e);
            $('#ddaeditDistrict').formSelect();
        }
    });
});

$("#edit").click(function() {
    console.log("Inside #edit")
    var id = $("#editDda").attr("key");
    var name = $('#ddaeditText').val();
    var number = $('#ddaeditNumber').val();
    var email = $('#ddaeditEmail').val();
    var username = $('#ddaeditUsername').val();
    var district = $('#ddaeditDistrict').val();
    console.log(id);
    console.log(name);
    console.log(number);
    console.log(email);
    $.ajax({
        url: `http://18.224.202.135/api/user/${id}/`,
        type: 'PUT',
        headers: {
            'Authorization': 'Token ' + token
        },
        data: {
            "name": name,
            "number": number,
            "email": email,
            "username": username,
            "district": district,
        },
        async: true,
        dataType: 'json',
        beforeSend: function() {
            $(".loading").show();
            $('tbody').html("")
        },
        success: function(res) {
            console.log('edit successfull')
            var page = $('.pagination').children('.active').children('a').html();
            M.toast({ html: 'DDA has been changed!!', classes: 'rounded green center' })
            getData(parseInt(page));
            console.log(page);
            $(".loading").hide();
        },
        error: function(e) {
            console.log(e);
            var page = $('.pagination').children('.active').children('a').html();
            getData(parseInt(page));
            M.toast({ html: 'Some error occured.No changes!!', classes: 'rounded red' })
        }
    });
});


// delete functions to set data in the fields of modal and make request
//set data when modal is shown
$(document).on("click", "#deletebutton", function() {
    // get id of the row clicked
    var id = $(this).parent().parent().attr('key');
    // set id of the row to the modal
    $("#deleteDda").attr("key", id);
});

$("#delete").click(function() {
    var id = $("#deleteDda").attr("key");
    $.ajax({
        url: `http://18.224.202.135/api/user/${id}/`,
        type: 'DELETE',
        headers: {
            'Authorization': 'Token ' + token
        },
        async: true,
        dataType: 'json',
        beforeSend: function() {
            $(".loading").show();
            $('tbody').html("")
        },
        success: function(res) {
            console.log('delete successfull')
            var page = $('.pagination').children('.active').children('a').html();
            getData();
            M.toast({ html: 'District deleted successfully', classes: 'rounded green' })
        },
        error: function(e) {
            console.log(e);
            var page = $('.pagination').children('.active').children('a').html();
            getData();
            M.toast({ html: 'Some error occured.No changes!!', classes: 'rounded red' })
        }

    })
})


var fd = new FormData();
$("#csvfile").change(function() {
    fd.append('dda_csv', this.files[0], this.files[0].name); // since this is your file input
    console.log(this.files[0])

});


$('#uploaddda').click(function() {
    $.ajax({
        url: "http://18.224.202.135/api/upload/dda/",
        type: 'POST',
        headers: {
            'Authorization': 'Token ' + token
        },
        enctype: 'multipart/form-data',
        contentType: false,
        processData: false,
        data: fd,
        beforeSend: function() {
            $(".loading").show();
            $("tbody").html("");
            $(".pagination").html("");
        },
        success: function(res) {
            $(".loading").hide();
            console.log(res)
            console.log("uploaded successfully")
            getData();
        },
        error: function(e) {
            console.log(e);
            alert("An error occured, please try again.");
        }
    });
})