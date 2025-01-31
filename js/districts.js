var token = localStorage.getItem("TokenFile")
$(document).ready(function() {
    if (token == null) {
        window.location.href = "index.html";
    } else {
        $('.modaladd').modal();
        $('.modaledit').modal();
        $('.modaldelete').modal();
        $('.modalbulk').modal();
        if ($(window).width() < 480 && $(window).width() > 320) {

            // $('a').remove();
            $('#addbtnid').html('<a id="addbutton" class="center waves-effect blue lighten-1 waves-light btn modal-trigger" data-target="addDistrict">Add</a>')
            $('#addbulkbtnid').html('<a id="addbulkbutton" class="center waves-effect blue lighten-1 waves-light btn modal-trigger" data-target="addBulk">AddBulk</a>')
            console.log("width less than 600");
        }
        getData();
    }


});

function getData() {
    $.ajax({
        url: "http://18.224.202.135/api/district/",
        type: 'GET',
        headers: {
            'Authorization': 'Token ' + token
        },
        async: false,
        dataType: 'json',
        beforeSend: function() {
            $(".loading").show();
        },
        success: function(res) {
            if (res.length > 0) {
                res.map(item => {
                    row = `<tr key=${item.id}>
                        <td>${res.indexOf(item)+1}</td>
                            <td id="title">${item.district}</td>
                            <td>
                                <a id="editbutton" class="btn waves-effect waves-light modal-trigger" data-target="editDistrict"><i class="large material-icons left">edit</i>Edit</a>
                                <a id="deletebutton" class="btn red waves-effect modal-trigger" data-target="deleteDistrict"><i class="material-icons left">delete</i>DELETE</a>
                            </td>
                        </tr>`
                    $('.table-body').append(row)
                })
            } else {
                $('#tablerow').after('<center>No Data Available</center>')
            }
            $(".loading").hide();
        },
        error: function(e) {
            $(".loading").hide();
            $('#tablerow').after('<center>Unable to load data.Please try again..</center>')
            console.log(e);
        }
    });
}




// edit functions to set data in the fields of modal and make request
//set data when modal is shown
$(document).on("click", "#editbutton", function() {
    // get id of the row clicked
    var id = $(this).parent().parent().attr('key');
    var district = $(this).parent().siblings('#title');
    console.log(id, district.html());
    // set id of the row to the modal
    $("#editDistrict").attr("key", id);
    $('#districtName').val(district.html());
});

$("#edit").click(function() {
    var id = $("#editDistrict").attr("key");
    var districtName = $('#districtName').val();
    $.ajax({
        url: `http://18.224.202.135/api/district/${id}/`,
        type: 'PUT',
        headers: {
            'Authorization': 'Token ' + token
        },
        data: {
            "district": districtName,
        },
        async: true,
        dataType: 'json',
        beforeSend: function() {
            $(".loading").show();
            $('.table-body').html("")
        },
        success: function(res) {
            console.log('edit successfull')
            M.toast({ html: 'District has been changed!!', classes: 'rounded green center' })
            getData();
            // $(".loading").hide();
            console.log(res)
        },
        error: function(e) {
            console.log(e);
            getData();
            M.toast({ html: 'Some error occured.No changes!!', classes: 'rounded red' })
        }
    });
});

// delete functions to set data in the fields of modal and make request
//set data when modal is shown
$(document).on("click", "#deletebutton", function() {
    // get id of the row clicked
    var id = $(this).parent().parent().attr('key');
    console.log(id)
        // set id of the row to the modal
    $("#deleteDistrict").attr("key", id);
});

$("#delete").click(function() {
    var id = $("#deleteDistrict").attr("key");
    $.ajax({
        url: `http://18.224.202.135/api/district/${id}/`,
        type: 'DELETE',
        headers: {
            'Authorization': 'Token ' + token
        },
        async: true,
        dataType: 'json',
        beforeSend: function() {
            $(".loading").show();
            $('.table-body').html("")
        },
        success: function(res) {
            console.log('delete successfull')
            getData();
            // $(".loading").hide();
            console.log(res)
            M.toast({ html: 'District deleted successfully', classes: 'rounded green' })
        },
        error: function(e) {
            console.log(e);
            getData();
            M.toast({ html: 'Some error occured.No changes!!', classes: 'rounded red' })
        }
    });
});

$('#addbutton').click(function() {
    $('#districtText').val("");
    $('#districtCode').val("");
})

$("#addid").click(function() {
    var districtName = $('#districtText').val();
    var districtCode = $('#districtCode').val();
    console.log('Add clicked')
    $.ajax({
        url: "http://18.224.202.135/api/district/",
        type: 'POST',
        headers: {
            'Authorization': 'Token ' + token
        },
        data: {
            "district": districtName,
            "district_code": districtCode
        },
        async: true,
        dataType: 'json',
        beforeSend: function() {
            $('.table-body').html("")
            $(".loading").show();
        },
        success: function(res) {
            console.log('add successfull')
            $(".loading").hide();
            console.log(res)
            getData();
            M.toast({ html: 'District added succesfully!!', classes: 'rounded green' })
        },
        error: function(e) {
            console.log(e);
            getData();
            M.toast({ html: 'Some error occured.District not added!!', classes: 'rounded red' })
        }
    });
});

$("#cancelid").click(function() {
    console.log('Cancel clicked')
    $('#districtText').val("");
    $('#districtCode').val("");
});


var fd = new FormData();
$("#csvfile").change(function() {
    fd.append('district_csv', this.files[0], this.files[0].name); // since this is your file input
    console.log(this.files[0])

});


$('#uploaddistricts').click(function() {
    $.ajax({
        url: "http://18.224.202.135/api/upload/districts/",
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


function search() {
    input = $("#searchdistrict");
    filter = input.val().toUpperCase();
    table = $("#districttable");
    tr = table.children("tbody").children("tr")
    var i;


    tr.each(function() {
        var td = $(this).find('td:eq(1)')
        if (td) {
            var txtValue = td.text()
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                $(this).css("display", "")
            } else {
                $(this).css("display", "none")
                console.log($('tbody').html())
            }
        }
    })

}