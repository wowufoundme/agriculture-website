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
        $('select').append(`<option value="default" disabled selected>Choose District</option>`)
        $.ajax({
            url: "http://13.235.100.235/api/district/",
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
        if ($(window).width() < 640 && $(window).width() > 320) {

            // $('a').remove();
            $('#addbtnid').html("<a id='addbutton' class='waves-effect blue lighten-1 waves-light btn modal-trigger' data-target='addVillage'>Add</a>")
            $('#addbulkbtnid').html("<a id='addbulkbutton' class='waves-effect blue lighten-1 waves-light btn modal-trigger' data-target='addBulk'>AddBulk</a>")
            console.log("width less than 600");
        }

        getData();
    }

});

function getData(page = 1, search = "") {
    if (page !== 1)
        url = `http://13.235.100.235/api/villages-list/?search=${search}&page=${page}`
    else
        url = `http://13.235.100.235/api/villages-list/?search=${search}`
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
                        <tr key=${item.id}>
                            <td>${res.results.indexOf(item) + (page-1)*10 + 1}</td>
                            <td id="title">${item.village}</td>
                            <td>
                                <a id="editbutton" class="btn waves-effect waves-light modal-trigger" data-target="editVillage"><i class="large material-icons left">edit</i>Edit</a>
                                <a id="deletebutton" class="btn red waves-effect modal-trigger" data-target="deleteVillage"><i class="material-icons left">delete</i>DELETE</a>
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
                for (var i = 0; i < res.count / 20; i++) {
                    page_tab = `<li id="page-tab" class="waves-effect"><a>${i+1}</a></li>`
                    active_tab = `<li id="page-tab" class="active"><a>${i+1}</a></li>`
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

$('#searchvillage').keypress(function(event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {
        $(".loading").show();
        input = $("#searchvillage");
        filter = input.val().toUpperCase();
        var id = $('#page-tab').children('a').html()
        console.log(id)
        console.log(filter)
        getData(parseInt(id), filter);
    }
})

// pagination handle functions
$(document).on("click", "#page-tab", function() {
    // get id of the row clicked
    input = $("#searchvillage");
    filter = input.val().toUpperCase();
    var id = $(this).children('a').html()
    getData(parseInt(id), filter);
});

// left arrow
$(document).on("click", "#left", function() {
    // get id of the row clicked
    var id = $(this).siblings('.active').children('a').html();
    input = $("#searchvillage");
    filter = input.val().toUpperCase();
    getData(parseInt(id) - 1, filter);
});

// right arrow
$(document).on("click", "#right", function() {
    // get id of the row clicked
    var id = $(this).siblings('.active').children('a').html();
    input = $("#searchvillage");
    filter = input.val().toUpperCase();
    getData(parseInt(id) + 1, filter);
});



// edit functions to set data in the fields of modal and make request
//set data when modal is shown
$(document).on("click", "#editbutton", function() {
    // get id of the row clicked
    var id = $(this).parent().parent().attr('key');
    var village = $(this).parent().siblings('#title');
    // set id of the row to the modal
    $("#editVillage").attr("key", id);
    $('#villageName').val(village.html());
    $('#editDistrict').val("default");
    // re-initialize material-select
    $('#editDistrict').html("")
    $('#editDistrict').append(`<option value="default" disabled selected>Choose District</option>`)
    $.ajax({
        url: "http://13.235.100.235/api/district/",
        type: 'GET',
        async: false,
        dataType: 'json',
        success: function(res) {
            if (res.length > 0) {
                res.map(item => {
                    row = `
                    <option value="${item.id}">${item.district}</option>
                    `
                    $('#editdistrict').append(row)
                })
            }
            $('#editdistrict').formSelect();
        },
        error: function(e) {
            console.log(e);
            $('#editdistrict').formSelect();
        }
    });
});

$("#edit").click(function() {
    var id = $("#editVillage").attr("key");
    var villageName = $('#villageName').val();
    var district = $('#editdistrict').val();
    console.log(district)
    $.ajax({
        url: `http://13.235.100.235/api/village/${id}/`,
        type: 'PUT',
        headers: {
            'Authorization': 'Token ' + token
        },
        data: {
            "village": villageName,
            "district": district
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
            M.toast({ html: 'District has been changed!!', classes: 'rounded green center' })
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
    $("#deleteVillage").attr("key", id);
});

$("#delete").click(function() {
    var id = $("#deleteVillage").attr("key");
    $.ajax({
        url: `http://13.235.100.235/api/village/${id}/`,
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
    });
});

$(document).on("click", "#addbutton", function() {
    console.log("hello")
    $('#villageText').val("");
    $('#villageCode').val("");
    $('select').val("default");
    $('select').append(`<option value="default" disabled selected>Choose District</option>`)
})

$("#addid").click(function() {
    var villageName = $('#villageText').val();
    var villageCode = $('#villageCode').val();
    var district = $('select').val();
    console.log(district)
    console.log(villageName);
    console.log(villageCode);
    console.log('Add clicked')
    $.ajax({
        url: "http://13.235.100.235/api/village/",
        type: 'POST',
        headers: {
            'Authorization': 'Token ' + token
        },
        data: {
            "village": villageName,
            "village_code": villageCode,
            "district": district
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
            M.toast({ html: 'Village added succesfully!!', classes: 'rounded green' })
        },
        error: function(e) {
            console.log(e);
            M.toast({ html: 'Some error occured.Village not added!!', classes: 'rounded red' })
        }
    });
});

var fd = new FormData();
$("#csvfile").change(function() {
    fd.append('village_csv', this.files[0], this.files[0].name); // since this is your file input
    console.log(this.files[0])

});


$('#uploadvillages').click(function() {
    $.ajax({
        url: "http://13.235.100.235/api/upload/villages/",
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