$(document).ready(function() {
    $('.tabs').tabs();
    getPendingData();
    getOngoingData();
});


function getPendingData(page = 1) {
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
                    <td>${item.block_name + "," + item.village_name + "," + item.district}</td>
                    <td>${item.dda==null ? 'not assigned' : item.dda.name}</td>
                    <td>${item.ado==null ? 'not assigned' : item.ado.name}</td>
                    <td>
                        <a id="reportbtn" class="waves-effect blue lighten-1 waves-light btn">View Report</a>
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
                for (var i = 0; i < res.count / 10; i++) {
                    page_tab = `<li id="page-tab" class="waves-effect"><a href="#!">${i+1}</a></li>`
                    active_tab = `<li id="page-tab" class="active"><a href="#!">${i+1}</a></li>`
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

function getOngoingData(page = 1) {
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
                    <td>${item.block_name + "," + item.village_name + "," + item.district}</td>
                    <td>${item.dda==null ? 'not assigned' : item.dda.name}</td>
                    <td>${item.ado==null ? 'not assigned' : item.ado.name}</td>
                    <td>
                        <a id="reportbtn" class="waves-effect blue lighten-1 waves-light btn">View Report</a>
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
                for (var i = 0; i < res.count / 10; i++) {
                    page_tab = `<li id="page-tab" class="waves-effect"><a href="#!">${i+1}</a></li>`
                    active_tab = `<li id="page-tab" class="active"><a href="#!">${i+1}</a></li>`
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


// pagination handle functions
$(document).on("click", "#page-tab", function() {
    // get id of the row clicked
    var id = $(this).children('a').html()
    getPendingData(parseInt(id));
    getOngoingData(parseInt(id));
});

// left arrow
$(document).on("click", "#left", function() {
    // get id of the row clicked
    var id = $(this).siblings('.active').children('a').html();
    getPendingData(parseInt(id) - 1);
    getOngoingData(parseInt(id) - 1);
});

// right arrow
$(document).on("click", "#right", function() {
    // get id of the row clicked
    var id = $(this).siblings('.active').children('a').html();
    getPendingData(parseInt(id) + 1);
    getOngoingData(parseInt(id) + 1);
});