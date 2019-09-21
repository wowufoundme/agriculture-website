    $(document).ready(function() {
        $('.modaladd').modal();
        $('.modaledit').modal();
        $('.modaldelete').modal();

        $.ajax({
            url: "http://13.235.100.235:8000/api/district/",
            type: 'GET',
            headers: {
                'Authorization': 'Token a5ed9f187e22c861262a5e5a37eaed92a6c84c0c'
            },
            async: false,
            dataType: 'json',
            beforeSend: function() {
                $(".loading").show();
            },
            success: function(res) {
                if(res.length > 0){
                    res.map(item=>{
                        row = `<tr key=${res.id}>
                            <td>${res.indexOf(item)+1}</td>
                                <td>${item.district}</td>
                                <td>
                                    <a class="btn waves-effect waves-light modal-trigger" data-target="editDistrict"><i class="large material-icons left">edit</i>Edit</a>
                                    <a class="btn red waves-effect modal-trigger" data-target="deleteDistrict"><i class="material-icons left">delete</i>DELETE</a>
                                </td>
                            </tr>`
                        $('.table-body').append(row)
                    })
                }else{
                    $('#tablerow').after('<center>No Data Available</center>')
                }
                $(".loading").hide();
                console.log(res)
            },
            error: function(e) {
                console.log(e);
            }
        });

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
            beforeSend: function() {
                $(".loading").show();
            },
            success: function(res) {
                console.log('add successfull')
                $(".loading").hide();
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