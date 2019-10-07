// get data for specified page
var token = localStorage.getItem("TokenFile")

$(document).ready(function() {

    $("#e1").select2({
        searchInputPlaceholder: 'Search for village name...',
    });
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

        $('#selectdda').append(`<option value="default" disabled selected>Choose DDA</option>`)
        $.ajax({
            url: "http://18.224.202.135/api/user/dda/",
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


    }

    if ($(window).width() < 640 && $(window).width() > 320) {

        // $('a').remove();
        $('#addbtnid').html('<a id="addbutton" class="center waves-effect blue lighten-1 waves-light btn modal-trigger" data-target="addAdo">Add</a>')
        $('#addbulkbtnid').html('<a id="addbulkbutton" class="center waves-effect blue lighten-1 waves-light btn modal-trigger" data-target="addBulk">AddBulk</a>')
        console.log("width less than 600");
    }
    getData();
})


function matchCustom(params, data) {
    // If there are no search terms, return all of the data
    if ($.trim(params.term) === '') {
        return data;
    }

    // Do not display the item if there is no 'text' property
    if (typeof data.text === 'undefined') {
        return null;
    }

    // `params.term` should be the term that is used for searching
    // `data.text` is the text that is displayed for the data object
    if (data.text.indexOf(params.term) > -1) {
        var modifiedData = $.extend({}, data, true);
        modifiedData.text += ' (matched)';

        // You can return modified objects from here
        // This includes matching the `children` how you want in nested data sets
        return modifiedData;
    }

    // Return `null` if the term should not be displayed
    return null;
}

function getData(page = 1, search = "") {
    if (page !== 1)
        url = `http://18.224.202.135/api/users-list/ado/?search=${search}&page=${page}`
    else
        url = `http://18.224.202.135/api/users-list/ado/?search=${search}`
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
                        <a>
                            <i class="material-icons">chevron_left</i>
                        </a>
                    </li>
                `
                if (page !== 1) {
                    $('.pagination').append(arrow_left_enabled);
                }
                for (var i = 0; i < res.count / 20; i++) {
                    page_tab = `<li id="page-tab" class="waves-effect"><a href="#!">${i+1}</a></li>`
                    active_tab = `<li id="page-tab" class="active"><a href="#!">${i+1}</a></li>`
                        // }

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


$('#searchado').keypress(function(event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {
        input = $("#searchado");
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
    input = $("#searchado");
    filter = input.val()
    getData(parseInt(id), filter);
});

// left arrow
$(document).on("click", "#left", function() {
    // get id of the row clicked
    var id = $(this).siblings('.active').children('a').html();
    input = $("#searchado");
    filter = input.val()
    getData(parseInt(id) - 1, filter);
});

// right arrow
$(document).on("click", "#right", function() {
    // get id of the row clicked
    var id = $(this).siblings('.active').children('a').html();
    input = $("#searchado");
    filter = input.val()
    getData(parseInt(id) + 1, filter);
});

// add functions
$(document).on('click', '#addbutton', function() {
    console.log('asddas')
    $('#adoText').val("");
    $('#adoNumber').val("");
    $('#adoEmail').val("");
    $('#adoUsername').val("");
    $('#adoPassword').val("");
    // $('#selectvillage').val("default");
    // // re-initialize material-select
    // $('#selectvillage').html("")
    // $('#selectvillage').append(`<option value="default" disabled selected>Choose Village</option>`)

    $('#selectdda').val("default");
    // re-initialize material-select
    $('#selectdda').append(`<option value="default" disabled selected>Choose DDA</option>`)

    $('#selectvillage').val("default")
    $('#selectvillage').append(`<option value="default" disabled selected>Choose village</option>`)
    console.log('start')
    $('.e1').select2({
      ajax: {
        url: 'http://18.224.202.135/api/villages-list/',
        dataType: 'json',
        headers: {
            'Authorization': 'Token ' + token
        },
        async: false,
        delay: 250,
        data: function (params) {
            console.log(params)
            var queryParameters = {
              search: 'be', //search string,
            }

            return queryParameters;
          },
        processResults: function (data) {
          console.log(data.results)
          // Transforms the top-level key of the response object from 'items' to 'results'
          return {
            results: data.results.map(item=>{
                return {
                    id: item.id,
                    text: item.village
                }
            }),
            pagination:{
                more: data.next != null
            }
          };
        }
        // Additional AJAX parameters go here; see the end of this chapter for the full code of this example
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
        url: "http://18.224.202.135/api/user/",
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
        url: "http://18.224.202.135/api/village/",
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
        url: "http://18.224.202.135/api/user/dda/",
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
        url: `http://18.224.202.135/api/user/${id}/`,
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
    fd.append('ado_csv', this.files[0], this.files[0].name); // since this is your file input
    console.log(this.files[0])

});


$('#uploadados').click(function() {
    $.ajax({
        url: "http://18.224.202.135/api/upload/ado/",
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