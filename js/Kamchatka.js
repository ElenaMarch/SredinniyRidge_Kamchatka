/*

  Copyright (c) 2018 by Elena Marchenko, Institute of Volcanology and Seismology
  Volcanic hazard in Kamchatka, scale 1:000 000

*/


// URLs
rivURL = "json/rivers.geojson"
cityURL = "json/cities.geojson"
avolcURL = "json/active_volcanoes.geojson"
dangerURL = "json/danger.geojson"
hdangerURL = "json/high_danger.geojson"

// Base
var rivLayer = new L.GeoJSON.AJAX(rivURL, {style: {"color": "#3399ff", "weight": 0.3}}).addTo(map);
map.on('zoomend', function () {
  if (map.getZoom() > 9 && map.hasLayer(rivLayer)) {
    map.removeLayer(rivLayer)
  }
  if (map.getZoom() < 10 && !map.hasLayer(rivLayer)) {
    rivLayer.addTo(map);
  }
});

var cityMarker = {
  radius: 2.2,
  fillColor: "white",
  color: "#424040",
  weight: 1,
  opacity: 1,
  fillOpacity: 0.9
};

var cityLayer = new L.GeoJSON.AJAX(cityURL,
  {pointToLayer: function (feature, latlng) {
    var marker = L.circleMarker(latlng, cityMarker);
    marker.bindTooltip(feature.properties.PPPTNAME, {className: 'cityLabels', interactive: true});
    return marker} }
  ).addTo(map);

cityLayer.refilter(function(feature){
  return feature.properties.PPPTFLAG > 1;
});


map.on('zoomend', function () {
  if (map.getZoom() > 10 && map.hasLayer(cityLayer)) {
    map.removeLayer(cityLayer)
  }
  if (map.getZoom() < 11 && !map.hasLayer(cityLayer)) {
    cityLayer.addTo(map);
  }
  if (map.getZoom() < 11 && map.getZoom() > 8) {
    cityLayer.refilter(function(feature){
      return feature.properties.PPPTFLAG > 0;
    }); 
  }
  if (map.getZoom() < 9 && map.hasLayer(cityLayer)) {
    cityLayer.refilter(function(feature){
      return feature.properties.PPPTFLAG > 1;
    }); 
  }
});

// Volcanic danger assessment
function avolcStyle(feature) {
	switch (feature.properties.type) {
			case 1: return {"color": "red", "weight": 1.2, 'shape': "x", 'radius': 3};
      case 2: return {"color": "black", 'weight': 1.2, 'shape': "x", 'radius': 3}; 
      case 3: return {"color": "grey", 'weight': 1.2, 'shape': "x", 'radius': 3}; }
};

var avolcMarker = {
	"color": 'red',
	"shape": "x",
	"fillOpacity": 0.75,
	"radius": 3,
	"pane": 'Volc',
	"weight": 1.2
  }
var avolcLayer = new L.GeoJSON.AJAX(avolcURL,
  {pointToLayer: function (feature, latlng) {
    var marker = L.shapeMarker(latlng, avolcMarker);
    marker.bindTooltip(feature.properties.Name_eng, {className: 'cityLabels', interactive: true});
    return marker} }
  ).addTo(map);

// Seismic activity
 