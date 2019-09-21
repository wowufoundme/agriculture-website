// document.addEventListener('DOMContentLoaded', function() {
//     var elems = document.querySelectorAll('.modal');
//     var instances = M.Modal.init(elems, options);
// });
var districtName = document.getElementById("districtText").value;
var districtCode = document.getElementById('districtCode').value;
$("#addid").click(function() {
    console.log(districtName)
    console.log(districtCode)
    $.ajax({
        url: "http://13.235.100.235:8000/api/district/",
        type: 'GET',
        headers: {
            'Authorization': 'Token a5ed9f187e22c861262a5e5a37eaed92a6c84c0c'
        },
        // beforeSend: function(xhr) { xhr.setRequestHeader('Authorization', 'Token a5ed9f187e22c861262a5e5a37eaed92a6c84c0c'); },
        success: function(res) {
            console.log('add successfull');
            console.log(res);
        }
    });
});

// $("#addid").click(function() {
//     console.log('Add clicked')

//     $.ajax({
//         url: "http://13.235.100.235:8000/api/district/",
//         type: 'POST',
//         headers: {
//             'Authorization': 'Token a5ed9f187e22c861262a5e5a37eaed92a6c84c0c'
//         },
//         beforeSend: function(xhr) { xhr.setRequestHeader('Authorization', 'Token a5ed9f187e22c861262a5e5a37eaed92a6c84c0c'); },
//         data: {
//             "district": districtName,
//             "district_code": districtCode
//         },
//         dataType: 'json',
//         success: function(res) {
//             console.log('add successfull');
//             console.log(res);
//             alert('Thanks for your comment!');
//         }
//     });
// });