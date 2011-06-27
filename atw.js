/*
 * atw javascript
 * adam greig, 2011
 * public domain
 */

var map;

function setup_map(centre) {
    var latlng = new google.maps.LatLng(centre[0], centre[1]);
    var opts = {
        "zoom": 2,
        "center": latlng,
        "mapTypeId": google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map($('#map')[0], opts);
}

function plot_cities(cities) {
    setup_map(cities[0].position);
    polyline_points = [];
    $(cities).each(function(index, city) {
        var pos = city.position;
        var latlng = new google.maps.LatLng(pos[0], pos[1]);
        polyline_points.push(latlng);
        city.marker = new google.maps.Marker({
            "position": latlng,
            "map": map,
            "title": city.name,
            "clickable": false
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
