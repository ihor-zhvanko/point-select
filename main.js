'use strict'

var map;
var MAX_POINT_COUNT = 33;
var LVIV_POLYGON = [
    [22.644480999999999, 49.524173999999995],
    [23.280083999999999, 50.100544999999997],
    [23.727028999999998, 50.388000999999996],
    [23.997543, 50.412140999999998],
    [24.117774999999998, 50.647852],
    [24.230604, 50.583586999999994],
    [24.380717000000001, 50.609155000000001],
    [24.450274, 50.539161],
    [24.530618, 50.551566999999999],
    [24.596705, 50.413849999999996],
    [24.707276999999998, 50.383725999999996],
    [24.714890999999998, 50.342855999999998],
    [24.936831999999999, 50.345714000000001],
    [24.940601999999998, 50.389264999999995],
    [25.058779999999999, 50.342337999999998],
    [25.054310999999998, 50.300877999999997],
    [25.204953, 50.279313999999999],
    [25.165434999999999, 50.20919],
    [25.215111, 50.179564999999997],
    [25.197261999999998, 50.130998999999996],
    [25.427004, 49.943168],
    [25.287541999999998, 49.828240000000001],
    [25.083807, 49.828463999999997],
    [25.111812, 49.741458999999999],
    [25.022138999999999, 49.735146999999998],
    [24.942686999999999, 49.609211999999999],
    [24.721254999999999, 49.569817],
    [24.720831999999998, 49.496750999999996],
    [24.434891, 49.537098],
    [24.410474000000001, 49.444880999999995],
    [24.359859999999998, 49.430715999999997],
    [24.429364, 49.373292999999997],
    [24.380761, 49.307887000000001],
    [24.298786999999997, 49.295833999999999],
    [24.363999, 49.280738999999997],
    [24.357903999999998, 49.233371999999996],
    [24.446849, 49.230695999999995],
    [24.434972999999999, 49.173809999999996],
    [23.691759999999999, 49.095479999999995],
    [23.565842, 48.974713999999999],
    [23.607589999999998, 48.876228999999995],
    [23.540711999999999, 48.724378999999999],
    [23.201722999999998, 48.760348999999998],
    [23.131432, 48.852179999999997],
    [23.000903999999998, 48.829417999999997],
    [22.893594999999998, 48.908178999999997],
    [22.892757, 49.094555999999997],
    [22.707265, 49.174979999999998],
    [22.747679999999999, 49.215621999999996],
    [22.714887999999998, 49.226489999999998],
    [22.746810999999997, 49.359890999999998],
    [22.644480999999999, 49.524173999999995]
].map(function (x) { return { lng: x[0], lat: x[1] }; });

function initMap() {
    //lviv
    var uluru = { lat: 49.83826, lng: 24.02324 };
    map = new google.maps.Map(document.getElementById('myMap'), {
        zoom: 8.5,
        center: uluru
    });
    addSingleMarker(uluru.lat, uluru.lng);
    addLvivPolygon();
}

function addLvivPolygon() {
    var gPolygon = new google.maps.Polygon({
        paths: LVIV_POLYGON,
        strokeColor: 'blue',
        strokeOpacity: 0.5,
        strokeWeight: 1,
        fillColor: 'lightblue',
        fillOpacity: 0.3
    });
    gPolygon.setMap(map);
}

function addSingleMarker(geoPoint) {
    var markerImage = new google.maps.MarkerImage('target-icon.svg',
        new google.maps.Size(20, 20),
        new google.maps.Point(0, 0),
        new google.maps.Point(10, 10));

    return new google.maps.Marker({
        draggable: true,
        position: geoPoint,
        icon: markerImage,
        map: map
    });
}

function addPolyline(geoPoints) {
  var polyline = new google.maps.Polyline({
      path: geoPoints,
      geodesic: true,
      strokeColor: '#FF0000',
      strokeOpacity: 1.0,
      strokeWeight: 2
    });
  
  polyline.setMap(map);
}

function pushLog(msg) {
    var logElem = document.getElementById('myLog');
    logElem.innerHTML += msg + "<br/><hr/>";
}

function setLog(msg) {
    var logElem = document.getElementById('myLog');
    logElem.innerHTML = msg + "<br/><hr/>";
}



function getMyPoints() {
  
  document.getElementsByClassName('shadow')[0].classList.remove('hide'); 
}


function closeModal() {
  document.getElementsByClassName('shadow')[0].classList.add('hide');
}















