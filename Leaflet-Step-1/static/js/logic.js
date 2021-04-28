  // Create our map, giving it the streetmap and earthquakes layers to display on load
  var myMap = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 5,
  });

var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
tileSize: 512,
maxZoom: 18,
zoomOffset: -1,
id: "mapbox/streets-v11",
accessToken: API_KEY
}).addTo(myMap);



// Store our API endpoint inside queryUrl
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Perform a GET request to the query URL
d3.json(queryUrl, function(data) {

    quakedata = data.features;
    console.log(quakedata);

    for (var i = 0; i < quakedata.length; i++) {


    //     console.log(`${i} is ${quakedata[i].properties.mag}`);
    // }

//Colour codes
// #b7f34d
// #e1f34d
// #f3db4d
// #f3ba4d
// #f0a76b
// #f06b6b

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

    // for (var i = 0; i < quakedata.length; i++) {

    // console.log(`${i} is ${color}`);
    // }
        
        //Add cicles to map
        // Add circles to map
        var quakecoords = [quakedata[i].geometry.coordinates[1],quakedata[i].geometry.coordinates[0]];
        // console.log(`${i}: ${quakecoords}`)

        // L.circle([35.7513333, -117.5306667], {
        //     fillOpacity: 0.75,
        //     color: "green",
        //     fillColor: "green",
        //     // Adjust radius
        //     radius: 10000
        // }).addTo(myMap);

        L.circle(quakecoords, {
            fillOpacity: 0.75,
            color: "grey",
            weight: ".75",
            fillColor: color,
            // Adjust radius
            radius: quakedata[i].properties.mag * 20000
        }).bindPopup("<h3>" + quakedata[i].properties.place +
              "</br>Magnitude: " + quakedata[i].properties.mag + "<hr> </h3><p>" + new Date(quakedata[i].properties.time) + "</p>").addTo(myMap);
    }
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


   
    








