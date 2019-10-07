var pendinglocation
var ongoinglocation
var completedlocation
var array1 = []
var array2 = []
var array3 = []


function initMap() {

    //initialising map
    var map = new google.maps.Map(document.getElementById('map'), {
        center: new google.maps.LatLng(29.691697, 76.998168),
        zoom: 5,
        gestureHandling: 'cooperative',
    });



    //pending
    $.ajax({
        url: "http://18.224.202.135/api/locations/pending",
        type: 'GET',
        headers: {
            'Authorization': 'Token 6c00f8bf80284fbbe1a5153e234465c45eb2bc75'
        },
        async: false,
        dataType: 'json',
        success: function(res) {
            item = res.results
            item.map(i => {
                pendinglocation = { lat: parseFloat(i.latitude), lng: parseFloat(i.longitude) };
                array1.push(pendinglocation)
            })
        },
        error: function(e) {
            console.log(e);
        }
    })

    var markers1 = array1.map(function(location, i) {
        return new google.maps.Marker({
            position: location,
            label: 'P',
            // icon: {
            //     url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
            //     anchor: new google.maps.Point(255.498, -26.204),
            // }

        });
    });
    var markerCluster1 = new MarkerClusterer(map, markers1, { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' });



    //ongoing
    $.ajax({
        url: "http://18.224.202.135/api/locations/ongoing",
        type: 'GET',
        headers: {
            'Authorization': 'Token 6c00f8bf80284fbbe1a5153e234465c45eb2bc75'
        },
        async: false,
        dataType: 'json',
        success: function(res) {
            item = res.results
            item.map(i => {
                ongoinglocation = { lat: parseFloat(i.latitude), lng: parseFloat(i.longitude) };
                array2.push(ongoinglocation)
            })
        },
        error: function(e) {
            console.log(e);
        }
    })

    var markers2 = array2.map(function(location, i) {
        return new google.maps.Marker({
            position: location,
            label: 'O',
            icon: {
                url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
            }
        });
    });
    var markerCluster2 = new MarkerClusterer(map, markers2, { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' });


    //completed
    $.ajax({
        url: "http://18.224.202.135/api/locations/ongoing",
        type: 'GET',
        headers: {
            'Authorization': 'Token 6c00f8bf80284fbbe1a5153e234465c45eb2bc75'
        },
        async: false,
        dataType: 'json',
        success: function(res) {
            item = res.results
            item.map(i => {
                completedlocation = { lat: parseFloat(i.latitude), lng: parseFloat(i.longitude) };
                array3.push(completedlocation)
            })
        },
        error: function(e) {
            console.log(e);
        }
    })

    var markers3 = array3.map(function(location, i) {
        return new google.maps.Marker({
            position: location,
            label: 'C',
            icon: {
                url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
            }
        });
    });
    var markerCluster3 = new MarkerClusterer(map, markers3, { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' });

}