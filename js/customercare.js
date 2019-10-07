var pendinglocation
var ongoinglocation
var completedlocation
var array1 = []
var array2 = []
var array3 = []


function initMap() {

    //initialising map
    var map = new google.maps.Map(document.getElementById('map'), {
        center: new google.maps.LatLng(28.622472, 77.211867),
        zoom: 5,
        gestureHandling: 'cooperative'
    });


    var icon = {

        path: "M 256,480c-84.828,0-153.6-68.157-153.6-152.228c0-84.081, 153.6-359.782, 153.6-359.782s 153.6,275.702, 153.6,359.782C 409.6,411.843, 340.828,480, 256,480z M 255.498,282.245c-26.184,0-47.401,21.043-47.401,46.981c0,25.958, 21.217,46.991, 47.401,46.991c 26.204,0, 47.421-21.033, 47.421-46.991 C 302.92,303.288, 281.702,282.245, 255.498,282.245z",
        fillOpacity: .6,
        anchor: new google.maps.Point(255.498, -26.204),
        strokeWeight: 0,
        scale: .25,
        rotation: 180
    }


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
            icon: icon

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