$(document).ready(function() {
    $('.tabs').tabs();
    getPendingData();
    getOngoingData();
    getCompletedData();
});


function getPendingData(page = 1) {
    console.log("in pending")
    if (page !== 1)
        url = `http://13.235.100.235:8000/api/locations/pending?page=${page}`
    else
        url = `http://13.235.100.235:8000/api/locations/pending`
    $.ajax({
        url: url,
        type: 'GET',
        headers: {
            'Authorization': 'Token a5ed9f187e22c861262a5e5a37eaed92a6c84c0c'
        },
        async: false,
        dataType: 'json',
        beforeSend: function() {
            $("#paginationpending").html("");
            $("#pendingtbody").html("");
            // $("#pendingloading").show();
            $(".loading").show();
        },
        success: function(res) {
            if (res.results.length > 0) {
                res.results.map(item => {
                    row = `
                    <tr key=${item.id}>
                    <td>${res.results.indexOf(item) + (page-1)*10 + 1}</td>
                    <td>${item.block_name + "," + item.village_name + "," + item.district}</td>
                    <td>${item.dda==null ? 'not assigned' : item.dda.name}</td>
                    <td>${item.ado==null ? 'not assigned' : item.ado.name}</td>
                </tr>
                    `
                    $('#pendingtbody').append(row)
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
                    $('#paginationpending').append(arrow_left_enabled);
                }
                for (var i = 0; i < res.count / 10; i++) {
                    page_tab = `<li id="page-tab" class="waves-effect"><a href="#!">${i+1}</a></li>`
                    active_tab = `<li id="page-tab" class="active"><a href="#!">${i+1}</a></li>`
                    if (i === page - 1) {
                        $('#paginationpending').append(active_tab);
                    } else {
                        $('#paginationpending').append(page_tab);
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
                    $('#paginationpending').append(arrow_right)
                }

            } else {
                $('#pendingtable').after('<center>No Data Available</center>')
            }
            // $("#pendingloading").hide();
            $(".loading").hide();
        },
        error: function(e) {
            console.log(e);
        }
    });
}

//  <td>
// <a id="reportbtn" class="waves-effect blue lighten-1 waves-light btn">View Report</a>
// </td>

function getOngoingData(page = 1) {
    console.log("in ongoing")
    if (page !== 1)
        url = `http://13.235.100.235:8000/api/locations/ongoing?page=${page}`
    else
        url = `http://13.235.100.235:8000/api/locations/ongoing`
    $.ajax({
        url: url,
        type: 'GET',
        headers: {
            'Authorization': 'Token a5ed9f187e22c861262a5e5a37eaed92a6c84c0c'
        },
        async: false,
        dataType: 'json',
        beforeSend: function() {
            $("#paginationongoing").html("");
            $("#ongoingtbody").html("");
            // $("#ongoingloading").show();
            $(".loading").show();
        },
        success: function(res) {
            if (res.results.length > 0) {
                res.results.map(item => {
                    row = `
                    <tr key=${item.id}>
                    <td>${res.results.indexOf(item) + (page-1)*10 + 1}</td>
                    <td>${item.block_name + "," + item.village_name + "," + item.district}</td>
                    <td>${item.dda==null ? 'not assigned' : item.dda.name}</td>
                    <td>${item.ado==null ? 'not assigned' : item.ado.name}</td>
                    <td>
                        <a id="reportbtn" class="waves-effect blue lighten-1 waves-light btn">View Report</a>
                    </td>
                </tr>
                    `
                    $('#ongoingtbody').append(row)
                })
                arrow_left_enabled =
                    `
                    <li id="leftongoing" class="waves-effect">
                        <a href="#!">
                            <i class="material-icons">chevron_left</i>
                        </a>
                    </li>
                `
                if (page !== 1) {
                    $('#paginationongoing').append(arrow_left_enabled);
                }
                for (var i = 0; i < res.count / 10; i++) {
                    page_tab = `<li id="page-tabongoing" class="waves-effect"><a href="#!">${i+1}</a></li>`
                    active_tab = `<li id="page-tabongoing" class="active"><a href="#!">${i+1}</a></li>`
                    if (i === page - 1) {
                        $('#paginationongoing').append(active_tab);
                    } else {
                        $('#paginationongoing').append(page_tab);
                    }
                }

                if (res.count > 10 && page - 1 !== parseInt(res.count / 10)) {
                    arrow_right = `
                        <li id="rightongoing" class="waves-effect">
                            <a href="#!">
                                <i class="material-icons">chevron_right</i>
                            </a>
                        </li>
                    `
                    $('#paginationongoing').append(arrow_right)
                }

            } else {
                $('#ongoingtable').after('<center>No Data Available</center>')
            }
            // $("#ongoingloading").hide();
            $(".loading").hide();
        },
        error: function(e) {
            console.log(e);
        }
    });
}

function getCompletedData(page = 1) {
    console.log("in completed")
    if (page !== 1)
        url = `http://13.235.100.235:8000/api/locations/completed?page=${page}`
    else
        url = `http://13.235.100.235:8000/api/locations/completed`
    $.ajax({
        url: url,
        type: 'GET',
        headers: {
            'Authorization': 'Token a5ed9f187e22c861262a5e5a37eaed92a6c84c0c'
        },
        async: false,
        dataType: 'json',
        beforeSend: function() {
            $("#paginationcompleted").html("");
            $("#completedtbody").html("");
            // $("#completedloading").show();
            $(".loading").show();
        },
        success: function(res) {
            if (res.results.length > 0) {
                res.results.map(item => {
                    row = `
                    <tr key=${item.id}>
                    <td>${res.results.indexOf(item) + (page-1)*10 + 1}</td>
                    <td>${item.block_name + "," + item.village_name + "," + item.district}</td>
                    <td>${item.dda==null ? 'not assigned' : item.dda.name}</td>
                    <td>${item.ado==null ? 'not assigned' : item.ado.name}</td>
                    <td>
                        <a id="reportbtn" class="waves-effect blue lighten-1 waves-light btn">View Report</a>
                    </td>
                </tr>
                    `
                    $('#completedtbody').append(row)
                })
                arrow_left_enabled =
                    `
                    <li id="leftcompleted" class="waves-effect">
                        <a href="#!">
                            <i class="material-icons">chevron_left</i>
                        </a>
                    </li>
                `
                if (page !== 1) {
                    $('#paginationcompleted').append(arrow_left_enabled);
                }
                for (var i = 0; i < res.count / 10; i++) {
                    page_tab = `<li id="page-tabcompleted" class="waves-effect"><a href="#!">${i+1}</a></li>`
                    active_tab = `<li id="page-tabcompleted" class="active"><a href="#!">${i+1}</a></li>`
                    if (i === page - 1) {
                        $('#paginationcompleted').append(active_tab);
                    } else {
                        $('#paginationcompleted').append(page_tab);
                    }
                }

                if (res.count > 10 && page - 1 !== parseInt(res.count / 10)) {
                    arrow_right = `
                        <li id="rightcompleted" class="waves-effect">
                            <a href="#!">
                                <i class="material-icons">chevron_right</i>
                            </a>
                        </li>
                    `
                    $('#paginationcompleted').append(arrow_right)
                }

            } else {
                $('#completedtable').after('<center>No Data Available</center>')
            }
            // $("#completedloading").hide();
            $(".loading").hide();
        },
        error: function(e) {
            console.log(e);
        }
    });
}




// for pending:-
// pagination handle functions
$(document).on("click", "#page-tab", function() {
    // get id of the row clicked
    var id = $(this).children('a').html()
    getPendingData(parseInt(id));
});

// left arrow
$(document).on("click", "#left", function() {
    // get id of the row clicked
    var id = $(this).siblings('.active').children('a').html();
    getPendingData(parseInt(id) - 1);

});

// right arrow
$(document).on("click", "#right", function() {
    // get id of the row clicked
    var id = $(this).siblings('.active').children('a').html();
    getPendingData(parseInt(id) + 1);
});

// for ongoing:-
// pagination handle functions
$(document).on("click", "#page-tabongoing", function() {
    // get id of the row clicked
    var id = $(this).children('a').html()
    getOngoingData(parseInt(id));
});

// left arrow
$(document).on("click", "#leftongoing", function() {
    // get id of the row clicked
    var id = $(this).siblings('.active').children('a').html();
    getOngoingData(parseInt(id) - 1);
});

// right arrow
$(document).on("click", "#rightongoing", function() {
    // get id of the row clicked
    var id = $(this).siblings('.active').children('a').html();
    getOngoingData(parseInt(id) + 1);
});



// for completed:-
// pagination handle functions
$(document).on("click", "#page-tabcompleted", function() {
    // get id of the row clicked
    var id = $(this).children('a').html()
    getCompletedData(parseInt(id));
});

// left arrow
$(document).on("click", "#leftcompleted", function() {
    // get id of the row clicked
    var id = $(this).siblings('.active').children('a').html();
    getCompletedData(parseInt(id) - 1);
});

// right arrow
$(document).on("click", "#rightcompleted", function() {
    // get id of the row clicked
    var id = $(this).siblings('.active').children('a').html();
    getCompletedData(parseInt(id) + 1);
});