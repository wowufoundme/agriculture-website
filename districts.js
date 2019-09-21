    $(document).ready(function() {
        $('.modaladd').modal();
        $('.modaledit').modal();
        $('.modaldelete').modal();
    });

    $("#addid").click(function() {
        var districtName = $('#districtText').val();
        var districtCode = $('#districtCode').val();
        console.log(districtName);
        console.log(districtCode);
        console.log('Add clicked')
        $.ajax({
            url: "http://13.235.100.235:8000/api/district/",
            type: 'POST',
            headers: {
                'Authorization': 'Token a5ed9f187e22c861262a5e5a37eaed92a6c84c0c'
            },
            data: {
                "district": districtName,
                "district_code": districtCode
            },
            async: true,
            dataType: 'json',
            success: function(res) {
                console.log('add successfull')
                console.log(res)
            },
            error: function(e) {
                console.log(e);
            }
        });
    });

    $("#cancelid").click(function() {
        console.log('Cancel clicked')
        $('districtText').val("");
        $('districtCode').val("");
    });