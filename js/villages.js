// get data for specified page
function getData(page = 1){
    if (page !== 1)
        url = `http://13.235.100.235:8000/api/villages-list/?page=${page}`
    else
        url = `http://13.235.100.235:8000/api/villages-list/`
    $.ajax({
        url: url,
        type: 'GET',
        headers: {
            'Authorization': 'Token a5ed9f187e22c861262a5e5a37eaed92a6c84c0c'
        },
        async: false,
        dataType: 'json',
        beforeSend: function() {
            $(".loading").show();
            $("tbody").html("");
            $(".pagination").html("");
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
                if(page!==1){
                    $('.pagination').append(arrow_left_enabled);
                }
                for(var i=0;i<res.count/10;i++){
                    page_tab = `<li id="page-tab" class="waves-effect"><a href="#!">${i+1}</a></li>`
                    active_tab = `<li id="page-tab" class="active"><a href="#!">${i+1}</a></li>`
                    if(i===page-1){
                        $('.pagination').append(active_tab);
                    }else{
                        $('.pagination').append(page_tab);
                    }
                }

                if(res.count > 10 && page - 1 !== parseInt(res.count/10)){
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
    getData(parseInt(id)-1);
});

// right arrow
$(document).on("click", "#right", function() {
    // get id of the row clicked
    var id = $(this).siblings('.active').children('a').html();
    getData(parseInt(id)+1);
});

$(document).ready(function() {
    $('.modaladd').modal();
    $('.modaledit').modal();
    $('.modaldelete').modal();

    getData();
});

$("#addid").click(function() {
    var villageName = $('#villageText').val();
    var villageCode = $('#villageCode').val();
    console.log(villageName);
    console.log(villageCode);
    console.log('Add clicked')
    $.ajax({
        url: "http://13.235.100.235:8000/api/village/",
        type: 'POST',
        headers: {
            'Authorization': 'Token a5ed9f187e22c861262a5e5a37eaed92a6c84c0c'
        },
        data: {
            "village": villageName,
            "village_code": villageCode
        },
        async: true,
        dataType: 'json',
        beforeSend: function() {
            $(".loading").show();
        },
        success: function(res) {
            console.log('add successfull')
            $(".loading").hide();
            console.log(res)
            M.toast({ html: 'Village added succesfully!!', classes: 'rounded green' })
        },
        error: function(e) {
            console.log(e);
            M.toast({ html: 'Some error occured.Village not added!!', classes: 'rounded red' })
        }
    });
});