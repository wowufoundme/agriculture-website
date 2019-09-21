// var districtName = $("#ditrictText").val();
// var districtCode = $("#districtCode").val();
// $("#addid").click(function() {
//     console.log(districtName);
//     console.log(districtCode);
// });
// $("#addid").click(function() {
//     console.log('Add clicked')
//     $.ajax({
//         url: "http://13.235.100.235:8000/api/district/",
//         type: 'POST',
//         headers: {
//             'Authorization': 'Token a5ed9f187e22c861262a5e5a37eaed92a6c84c0c'
//         },
//         data: {
//             "district": districtName,
//             "district_code": districtCode
//         },
//         processData: false,
//         dataType: 'json',
//         success: function(res) {
//             console.log('add successfull')
//             console.log(res)
//         }
//     });
// });