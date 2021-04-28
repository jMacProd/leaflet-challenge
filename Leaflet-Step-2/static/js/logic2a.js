var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";


quakecircles = [];
// console.log("quakecircles0", quakecircles);
plates = [];

// Store our API endpoint inside queryUrl


// Perform a GET request to the query URL
d3.json(queryUrl, function(data) {

    quakedata = data.features;
    // console.log("quakedata", quakedata);

    for (var i = 0; i < quakedata.length; i++) {


    // Conditionals for countries points
        var color = "";
        if (quakedata[i].properties.mag > 5) {
            color = "#f06b6b";
        }
        else if (quakedata[i].properties.mag > 4) {
            color = "#f0a76b";
        }
        else if (quakedata[i].properties.mag > 3) {
        color = "#f3ba4d";
        }
        else if (quakedata[i].properties.mag > 2) {
        color = "#f3db4d";
        }
        else if (quakedata[i].properties.mag > 1) {
        color = "#e1f34d";
        }
        else {
        color = "#b7f34d";
        }
        // console.log("color", color);


        var quakecoords = [quakedata[i].geometry.coordinates[1],quakedata[i].geometry.coordinates[0]];
        // console.log(`${i}: ${quakecoords}`)


        var abc = L.circle(quakecoords, {
          fillOpacity: 0.75,
          color: "grey",
          weight: ".75",
          fillColor: color,
              // Adjust radius
          radius: quakedata[i].properties.mag * 20000
        }).bindPopup("<h3>" + quakedata[i].properties.place + "</br>Magnitude: " + quakedata[i].properties.mag + "<hr> </h3><p>" + new Date(quakedata[i].properties.time) + "</p>");

        quakecircles.push(abc);


    }
    // console.log("quakecircles1", quakecircles);
    
});

// console.log(quakecircles);

var queryUrl = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json"

d3.json(queryUrl, function(data) {

  platedata = data.features;
  // console.log("platedata", platedata);
  plates.push(
    L.geoJson(data)
  );
  // console.log("geoJson", L.geoJson(data));
});
// console.log("plates", plates);

var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
});

var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "dark-v10",
    accessToken: API_KEY
  });


citieslist = []
var littleton = L.marker([39.61, -105.02]).bindPopup('This is Littleton, CO.'),
denver    = L.marker([39.74, -104.99]).bindPopup('This is Denver, CO.'),
aurora    = L.marker([39.73, -104.8]).bindPopup('This is Aurora, CO.'),
golden    = L.marker([39.77, -105.23]).bindPopup('This is Golden, CO.');

citieslist.push(littleton);
citieslist.push(denver);
citieslist.push(aurora);
citieslist.push(golden);


var cities = L.layerGroup(citieslist);


var quakeLayer = L.layerGroup(quakecircles);
var plateslayer = L.layerGroup(plates);
// console.log("quakeLayer", quakeLayer);


var baseMaps = {
  "Streetmap": streetmap,
  "Darkmap": darkmap
};

// Overlays that may be toggled on or off
var overlayMaps = {
  "Earthquakes": quakeLayer,
  "Plates": plateslayer
};
// console.log("overlayMaps", overlayMaps);

 // Create our map, giving it the streetmap and earthquakes layers to display on load
 var myMap = L.map("map", {
  center: [
    37.09, -95.71
  ],
  zoom: 5,
  layers: [streetmap, quakeLayer]
});

quakeLayer.addTo(myMap);
// console.log("cities", cities);
// console.log("quakeLayer", quakeLayer);

// Pass our map layers into our layer control
// Add the layer control to the map
L.control.layers(baseMaps, overlayMaps, {
  collapsed: false
}).addTo(myMap);

d3.json(queryUrl, function(data) {
  //https://www.igismap.com/legend-in-leafletjs-map-with-topojson/
  var legend = L.control({
    position: "bottomright"
  });

  legend.onAdd = function() {
    var div = L.DomUtil.create("div", "info legend");

    var grades = [0, 1, 2, 3, 4, 5];
    var colors = ["#b7f34d", "#e1f34d", "#f3db4d", "#f3ba4d","#f0a76b", "#f06b6b"];


  // loop thry the intervals of colors to put it in the label
    for (var i = 0; i<grades.length; i++) {
      div.innerHTML +=
      "<i style='background: " + colors[i] + "'></i> " +
      grades[i] + (grades[i + 1] ? "&ndash;" + grades[i + 1] + "<br>" : "+");
    }
    return div;

  };

  legend.addTo(myMap)
});

