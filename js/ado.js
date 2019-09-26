// get data for specified page
function getData(page = 1) {
    if (page !== 1)
        url = `http://13.235.100.235:8000/api/users-list/ado/?page=${page}`
    else
        url = `http://13.235.100.235:8000/api/users-list/ado/`
    $.ajax({
        url: url,
        type: 'GET',
        headers: {
            'Authorization': 'Token a5ed9f187e22c861262a5e5a37eaed92a6c84c0c'
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
                            <td id="village">${item.village.village}</td>
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

$(document).ready(function() {
    $('.modaladd').modal();
    $('.modaledit').modal();
    $('.modaldelete').modal();
    $(document).ready(function() {
        $('select').formSelect();
    });
    getData();
});


// add functions
$('#addbutton').click(function() {
    $('#adoText').val("");
    $('#adoNumber').val("");
    $('#adoEmail').val("");
    $('#adoUsername').val("");
    $('#adoPassword').val("");
    $('select').val("default");
    // re-initialize material-select
    $('select').html("")
    $('select').append(`<option value="default" disabled selected>Choose District</option>`)
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
})

$("#addid").click(function() {
    var name = $('#adoText').val();
    var number = $('#adoNumber').val();
    var email = $('#adoEmail').val();
    var password = $('#adoPassword').val();
    var username = $('#adoUsername').val();
    var village = $('select').val();
    console.log(name);
    console.log(number);
    console.log(email)
    console.log(password)
    console.log(username)
    console.log(village)
    var type = 'ado'
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
            "village": village,
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
            'Authorization': 'Token a5ed9f187e22c861262a5e5a37eaed92a6c84c0c'
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


// $('.select-dropdown').scroll(function() {
//     if ($('.select-dropdown').height() - $(this).height() == $(this).scrollTop()) {
//         $(".loading").show();
//         alert('tada')
//     }
// });


// // Check the user is at the bottom of the element
// if ($(window).scrollTop() + $(window).height() > $this.height() && !busy) {

//     // Now we are working, so busy is true
//     busy = true;

//     // Tell the user we're loading posts
//     $this.find('.loading-bar').html('Loading Posts');
//     $(".loading").show();

//     // Run the function to fetch the data inside a delay
//     // This is useful if you have content in a footer you
//     // want the user to see.
//     setTimeout(function() {
//         // This is the Ajax function                    
//         getData();

//     }, $settings.delay);

// }