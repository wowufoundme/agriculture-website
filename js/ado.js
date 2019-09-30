// get data for specified page
var token = localStorage.getItem("TokenFile")

$(document).ready(function() {

    if (token == null) {
        window.location.href = "index.html"
    } else {
        $('.modaladd').modal();
        $('.modaledit').modal();
        $('.modaldelete').modal();
        $('.modalbulk').modal();

        $(document).ready(function() {
            $('select').formSelect();
        });
        $('#selectvillage').select2({
            placeholder: "Choose Village",
            allowClear: true,
            minimumResultsForSearch: Infinity,
            ajax: {
                url: "http://13.235.100.235/api/villages-list/",
                dataType: 'json',
                delay: 250,
                type: "GET",
                // headers: {
                //     'Authorization': 'Token ' + token
                // },
                data: function(params) {
                    console.log("in data")
                    var query = {
                        search: params.term, // search term
                        page: params.page || 1
                    };
                    return query;
                },
                // if (res.length > 0) {
                //     res.map(item => {
                //         row = `
                //     <option value="${item.id}">${item.village}</option>
                //     `
                //         $('#selectvillage').append(row)
                //     })
                // }
                processResults: function(data, params) {
                    console.log("in processresults")
                    console.log(data.results)
                    params.page = params.page || 1
                    return {
                        results: data.results,
                        pagination: {
                            more: (params.page * 10) < data.count_filtered
                        }
                    };

                },
                transport: function(params) {
                    console.log("in transport")
                    params.beforeSend = function(request) {
                        request.setRequestHeader("Authorization", 'Token ' + token);
                    };
                    return $.ajax(params);
                },
            },

            // initSelection: function(element, callback) {
            //     var id = $(element).val();
            //     if (id !== "") {
            //         $.ajax("http://13.235.100.235/api/villages-list/" + id, {
            //             dataType: "json"
            //         }).done(function(data) { callback(data); });
            //     }
            // },

        })


        if ($(window).width() < 640 && $(window).width() > 320) {

            // $('a').remove();
            $('#addbtnid').html('<a id="addbutton" class="center waves-effect blue lighten-1 waves-light btn modal-trigger" data-target="addAdo">Add</a>')
            $('#addbulkbtnid').html('<a id="addbulkbutton" class="center waves-effect blue lighten-1 waves-light btn modal-trigger" data-target="addBulk">AddBulk</a>')
            console.log("width less than 600");
        }
        getData();
    }

});

function getData(page = 1) {
    if (page !== 1)
        url = `http://13.235.100.235:8000/api/users-list/ado/?page=${page}`
    else
        url = `http://13.235.100.235:8000/api/users-list/ado/`
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
                            <td>${res.results.indexOf(item) + (page-1)*10 + 1}</td>
                            <td id="title">${item.name}</td>
                            <td id="village">${item.village.map(vill=>(
                                vill.village + ", "
                                )
                            )}</td>
                            <td id="number">${item.number}</td>
                            <td id="email">${item.email}</td>
                            <td>
                                <a id="editbutton" class="btn waves-effect waves-light modal-trigger" data-target="editAdo"><i class="large material-icons left">edit</i>Edit</a>
                                <a id="deletebutton" class="btn red waves-effect modal-trigger" data-target="deleteAdo"><i class="material-icons left">delete</i>DELETE</a>
                            </td>
                        </tr>
                	`
                    $('tbody').append(row)
                })
                arrow_left_enabled =
                    `
                    <li id="left" class="waves-effect">
                        <a href="#!">
                            <i class="material-icons">chevron_left</i>
                        </a>
                    </li>
                `
                if (page !== 1) {
                    $('.pagination').append(arrow_left_enabled);
                }
                for (var i = 0; i < res.count / 10; i++) {
                    page_tab = `<li id="page-tab" class="waves-effect"><a href="#!">${i+1}</a></li>`
                    active_tab = `<li id="page-tab" class="active"><a href="#!">${i+1}</a></li>`
                    if (i === page - 1) {
                        $('.pagination').append(active_tab);
                    } else {
                        $('.pagination').append(page_tab);
                    }
                }

                if (res.count > 10 && page - 1 !== parseInt(res.count / 10)) {
                    arrow_right = `
                        <li id="right" class="waves-effect">
                            <a href="#!">
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

// pagination handle functions
$(document).on("click", "#page-tab", function() {
    // get id of the row clicked
    var id = $(this).children('a').html()
    getData(parseInt(id));
});

// left arrow
$(document).on("click", "#left", function() {
    // get id of the row clicked
    var id = $(this).siblings('.active').children('a').html();
    getData(parseInt(id) - 1);
});

// right arrow
$(document).on("click", "#right", function() {
    // get id of the row clicked
    var id = $(this).siblings('.active').children('a').html();
    getData(parseInt(id) + 1);
});

$(window).load(function() {
    // Animate loader off screen
    $("#loader").hide();
});




// add functions
$('#addbutton').click(function() {
    $('#adoText').val("");
    $('#adoNumber').val("");
    $('#adoEmail').val("");
    $('#adoUsername').val("");
    $('#adoPassword').val("");
    $('#selectvillage').val("default");
    // re-initialize material-select
    $('#selectvillage').html("")
    $('#selectvillage').append(`<option value="default" disabled selected>Choose Village</option>`)

    $('#selectdda').val("default");
    // re-initialize material-select
    $('#selectdda').html("")
    $('#selectdda').append(`<option value="default" disabled selected>Choose DDA</option>`)
        // $.ajax({
        //     url: "http://13.235.100.235:8000/api/village/",
        //     type: 'GET',
        //     headers: {
        //         'Authorization': 'Token ' + token
        //     },
        //     async: true,
        //     dataType: 'json',
        //     success: function(res) {
        //         if (res.length > 0) {
        //             res.map(item => {
        //                 row = `
        //                 <option value="${item.id}">${item.village}</option>
        //                 `
        //                 $('#selectvillage').append(row)
        //             })
        //         }
        //         console.log("village loaded");
        //         $('#selectvillage').formSelect();
        //     },
        //     error: function(e) {
        //         console.log(e);
        //         $('#selectvillage').formSelect();
        //     }
        // });

    $.ajax({
        url: "http://13.235.100.235:8000/api/user/dda/",
        type: 'GET',
        headers: {
            'Authorization': 'Token ' + token
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
})



$("#addid").click(function() {
    var name = $('#adoText').val();
    var number = $('#adoNumber').val();
    var email = $('#adoEmail').val();
    var password = $('#adoPassword').val();
    var username = $('#adoUsername').val();
    var village = $('#selectvillage').val();
    console.log(village)
    var dda = $('#selectdda').val();
    var type = 'ado'
    var data = {
        "name": name,
        "number": number,
        "email": email,
        "username": username,
        "password": password,
        "type_of_user": type,
        "village": village.map(id => (parseInt(id))),
        "dda": parseInt(dda)
    }
    $.ajax({
        url: "http://13.235.100.235:8000/api/user/",
        type: 'POST',
        headers: {
            'Authorization': 'Token ' + token
        },
        contentType: 'application/json',
        data: JSON.stringify(data),
        processData: false,
        dataType: 'json',
        beforeSend: function() {
            $(".loading").show();
            $("tbody").html("");
            $(".pagination").html("");
        },
        success: function(res) {
            console.log('add successfull')
            $(".loading").hide();
            console.log(res)
            getData();
            M.toast({ html: 'ADO added succesfully!!', classes: 'rounded green' })
        },
        error: function(e) {
            console.log(e);
            M.toast({ html: 'Some error occured.ADO not added!!', classes: 'rounded red' })
        }
    });
});




// edit functions to set data in the fields of modal and make request
//set data when modal is shown
$(document).on("click", "#editbutton", function() {
    // get id of the row clicked
    var id = $(this).parent().parent().attr('key');
    var adoname = $(this).parent().siblings('#title');
    var adonumber = $(this).parent().siblings('#number');
    var adoemail = $(this).parent().siblings('#email');

    // set id of the row to the modal
    $("#editAdo").attr("key", id);
    $('#adoeditText').val(adoname.html());
    $('#adoeditNumber').val(adonumber.html());
    $('#adoeditEmail').val(adoemail.html());
    $('#adoeditUsername').val("");


    $('#selecteditvillage').val("default");
    // re-initialize material-select
    $('#selecteditvillage').html("")
    $('#selecteditvillage').append(`<option value="default" disabled selected>Choose Village</option>`)

    $('#selecteditdda').val("default");
    // re-initialize material-select
    $('#selecteditdda').html("")
    $('#selecteditdda').append(`<option value="default" disabled selected>Choose DDA</option>`)
    $.ajax({
        url: "http://13.235.100.235:8000/api/village/",
        type: 'GET',
        headers: {
            'Authorization': 'Token ' + token
        },
        async: false,
        dataType: 'json',
        success: function(res) {
            if (res.length > 0) {
                res.map(item => {
                    row = `
                    <option value="${item.id}">${item.village}</option>
                    `
                    $('#selecteditvillage').append(row)
                })
            }
            console.log("village loaded");
            $('#selecteditvillage').formSelect();
        },
        error: function(e) {
            console.log(e);
            $('#selecteditvillage').formSelect();
        }
    });

    $.ajax({
        url: "http://13.235.100.235:8000/api/user/dda/",
        type: 'GET',
        headers: {
            'Authorization': 'Token ' + token
        },
        async: false,
        dataType: 'json',
        success: function(res) {
            if (res.length > 0) {
                res.map(item => {
                    row = `
                    <option value="${item.id}">${item.name}</option>
                    `
                    $('#selecteditdda').append(row)
                })
            }
            console.log("dda list loaded")
            $('#selecteditdda').formSelect();
        },
        error: function(e) {
            console.log(e);
            $('#selecteditdda').formSelect();
        }
    });
});

$("#edit").click(function() {
    console.log("Inside #editAdo")
    var id = $("#editAdo").attr("key");
    var name = $('#adoeditText').val();
    var number = $('#adoeditNumber').val();
    var email = $('#adoeditEmail').val();
    var username = $('#adoeditUsername').val();
    var village = $('#selecteditvillage').val();
    console.log(village)
    var dda = $('#selecteditdda').val();
    var data = {
        "name": name,
        "number": number,
        "email": email,
        "username": username,
        "village": village.map(id => (parseInt(id))),
        "dda": parseInt(dda)
    }
    $.ajax({
        url: `http://13.235.100.235:8000/api/user/${id}/`,
        type: 'PUT',
        headers: {
            'Authorization': 'Token ' + token
        },
        contentType: 'application/json',
        data: JSON.stringify(data),
        processData: false,
        dataType: 'json',
        beforeSend: function() {
            $(".loading").show();
            $('tbody').html("")
        },
        success: function(res) {
            console.log('edit successfull')
            var page = $('.pagination').children('.active').children('a').html();
            M.toast({ html: 'ADO has been changed!!', classes: 'rounded green center' })
            getData(parseInt(page));
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
    $("#deleteAdo").attr("key", id);
});

$("#delete").click(function() {
    var id = $("#deleteAdo").attr("key");
    console.log(id)
    $.ajax({
        url: `http://13.235.100.235:8000/api/user/${id}/`,
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
    fd.append('ado_csv', this.files[0], this.files[0].name); // since this is your file input
    console.log(this.files[0])

});


$('#uploadados').click(function() {
    $.ajax({
        url: "http://13.235.100.235:8000/api/upload/ado/",
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