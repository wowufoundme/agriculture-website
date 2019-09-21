$(document).ready(function() {
    $('.modaladd').modal();
    $('.modaledit').modal();
    $('.modaldelete').modal();
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