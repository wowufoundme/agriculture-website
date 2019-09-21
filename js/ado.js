$(document).ready(function() {
    $('.modaladd').modal();
    $('.modaledit').modal();
    $('.modaldelete').modal();
});

$("#cancelid").click(function() {
    console.log('Cancel clicked')
    $('districtText').val("");
    $('districtCode').val("");
});