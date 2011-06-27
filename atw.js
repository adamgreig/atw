/*
 * atw javascript
 * adam greig, 2011
 * public domain
 */

var map;
var info_window;

function setup_map(centre) {
    var latlng = new google.maps.LatLng(centre[0], centre[1]);
    var opts = {
        "zoom": 3,
        "center": latlng,
        "mapTypeId": google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map($('#map')[0], opts);
    info_window = new google.maps.InfoWindow({});
}

function plot_cities(cities) {
    setup_map(cities[0].position);
    polyline_points = [];
    $(cities).each(function(index, city) {
        var pos = city.position;
        if(pos == "interpolate") {
            var lat = (
                cities[index - 1].position[0]
              + cities[index + 1].position[0]
            ) / 2;
            var lng = (
                cities[index - 1].position[1]
              + cities[index + 1].position[1]
            ) / 2;
            pos = [lat, lng];
        }
        var latlng = new google.maps.LatLng(pos[0], pos[1]);
        var icon = city.type + ".png";
        polyline_points.push(latlng);
        city.marker = new google.maps.Marker({
            "position": latlng,
            "map": map,
            "title": city.name,
            "icon": icon
        });
        google.maps.event.addListener(city.marker, 'click', function(e) {
            var info = "<strong>"+city.name+"</strong>";
            if(city.info) {
                info += "<br />"+city.info;
            }
            info_window.close();
            info_window.setContent(info);
            info_window.open(map, this);
        });
    });
    var polyline = new google.maps.Polyline({
        "path": polyline_points,
        "map": map
    });
};

$.getJSON("cities.json", function(data) {
    plot_cities(data);
});
