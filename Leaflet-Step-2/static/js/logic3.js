// // Create our map, giving it the streetmap and earthquakes layers to display on load
// var myMap = L.map("map", {
// center: [37.09, -95.71],
//     zoom: 5,
// });


// Store our API endpoint inside queryUrl
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
//DONE

// Define arrays to hold created city and state markers
var earthquakecirlces = [];

// Conditionals for countries points
function circlecolor(mag) {

    if (mag > 5) {
        color = "#f06b6b";
    }
    else if (mag > 4) {
        color = "#f0a76b";
    }
    else if (mag > 3) {
    color = "#f3ba4d";
    }
    else if (mag > 2) {
    color = "#f3db4d";
    }
    else if (mag > 1) {
    color = "#e1f34d";
    }
    else {
    color = "#b7f34d";
    }

}


// Perform a GET request to the query URL
d3.json(queryUrl, function(data) { //DONE

    quakedata = data.features;
    console.log(quakedata);

    for (var i = 0; i < quakedata.length; i++) {

    

    // for (var i = 0; i < quakedata.length; i++) {

    // console.log(`${i} is ${color}`);
    // }
        
        //Add cicles to map
        // Add circles to map
        var quakecoords = [quakedata[i].geometry.coordinates[1],quakedata[i].geometry.coordinates[0]];
        console.log(`${i}: ${quakecoords}`)

        // L.circle([35.7513333, -117.5306667], {
        //     fillOpacity: 0.75,
        //     color: "green",
        //     fillColor: "green",
        //     // Adjust radius
        //     radius: 10000
        // }).addTo(myMap);

        earthquakecirlces.push(
            L.circle(quakecoords, {
                fillOpacity: 0.75,
                color: "grey",
                weight: ".75",
                fillColor: color,
                // Adjust radius
                radius: quakedata[i].properties.mag * 20000
            })//.bindPopup("<h3>" + quakedata[i].properties.place + //DONE
                //"</br>Magnitude: " + quakedata[i].properties.mag + "<hr> </h3><p>" + new Date(quakedata[i].properties.time) + "</p>")
            );
    }
    //https://www.igismap.com/legend-in-leafletjs-map-with-topojson/
    // var legend = L.control({
    //     position: "bottomright"
    //   });
    
    //   legend.onAdd = function() {
    //     var div = L.DomUtil.create("div", "info legend");
   
    //     var grades = [0, 1, 2, 3, 4, 5];
    //     var colors = ["#b7f34d", "#e1f34d", "#f3db4d", "#f3ba4d","#f0a76b", "#f06b6b"];
    
    
    //   // loop through the intervals of colors to put it in the label
    //     for (var i = 0; i<grades.length; i++) {
    //       div.innerHTML +=
    //       "<i style='background: " + colors[i] + "'></i> " +
    //       grades[i] + (grades[i + 1] ? "&ndash;" + grades[i + 1] + "<br>" : "+");
    //     }
    //     return div;
    
    //   };
    
      //legend.addTo(myMap)
});

console.log(earthquakecirlces)

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

// Define a baseMaps object to hold our base layers
var baseMaps = {
    "Street Map": streetmap,
    "Dark Map": darkmap
};

// Create two separate layer groups: one for cities and one for states
var earthquakes = L.layerGroup(earthquakecirlces);
//var faultlines = L.layerGroup(XXXXX);

// Create overlay object to hold our overlay layer
var overlayMaps = {
    "Earthquakes": earthquakes
};

// // Create our map, giving it the streetmap and earthquakes layers to display on load
var myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 5,
    layers: [streetmap, earthquakes]
});

// Create a layer control
  // Pass in our baseMaps and overlayMaps
  // Add the layer control to the map
//   L.control.layers(baseMaps, overlayMaps, {
//     collapsed: false
//   }).addTo(myMap);

L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
}).addTo(myMap);


   
    








