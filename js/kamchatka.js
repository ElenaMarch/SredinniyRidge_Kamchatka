/*

  Copyright (c) 2018 by Elena Marchenko, Institute of Volcanology and Seismology
  Volcanic hazard in Kamchatka, scale 1:000 000

*/


// URLs
rivURL = "json/rivers.geojson";
reefURL = "json/reef.geojson";
cityURL = "json/cities_all.geojson";
avolcURL = "json/active_volcanoes_all.geojson";
dangerURL = "https://services8.arcgis.com/GSlumpjgzkVdp2PH/arcgis/rest/services/danger_all/FeatureServer/0";
hdangerURL = "https://services8.arcgis.com/GSlumpjgzkVdp2PH/arcgis/rest/services/high_danger_all/FeatureServer/0";


// Base
var rivLayer = new L.GeoJSON.AJAX(rivURL, {style: {"color": "#3399ff", "weight": 0.3}}).addTo(map);
var reefLayer = new L.GeoJSON.AJAX(reefURL, {style: {"color": "red", "weight": 1}});

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


// Volcanic danger assessment
map.createPane('Danger');
function dangerStyle(feature) {
  switch (feature.properties.type) {
      case '1': return {"fillColor": "#D21704", "color": "#633705", "fillOpacity": 0.7, "weight": 0.5};
      case '2': return {"fillColor": "#F05511", "color": "#633705", "fillOpacity": 0.7, "weight": 0.5}; 
      case '3': return {"fillColor": "#FCA73C", "color": "#633705", "fillOpacity": 0.7, "weight": 0.5}; 
      case '4': return {"fillColor": "#FFE668", "color": "#633705", "fillOpacity": 0.7, "weight": 0.5}; }
};  
var dangerLayer = L.esri.featureLayer({url: dangerURL,  precision: 12,  maxZoom: 8, pane: 'Danger',
  fields: ['FID', 'type'], style: dangerStyle});

map.createPane('HighDanger');
var highstripes = new L.StripePattern({weight: 1.5, height: 4, color: 'black', spaceWeight: 2.5, spaceColor: 'none', angle: -30}); highstripes.addTo(map);
var hdangerLayer = L.esri.featureLayer({url: hdangerURL,  precision: 9,  maxZoom: 8, pane: 'HighDanger', 
  fields: ['FID'], style: {fillPattern: highstripes, weight: 0.3, fillOpacity: 0.5, color: 'grey' }});

var hazard = L.layerGroup([dangerLayer, hdangerLayer], {maxZoom: 8}).addTo(map);

map.createPane('AV');
function avolcStyle(feature) {
	switch (feature.properties.type) {
      case 1: return {"color": "red", "weight": 1.2, 'shape': "triangle", 'radius': 3, "fillOpacity": 0.75, "pane": 'AV'};
      case 2: return {"color": "black", 'weight': 1.2, 'shape': "triangle", 'radius': 3, "fillOpacity": 0.75, "pane": 'AV'}; 
      case 3: return {"color": "grey", 'weight': 1.2, 'shape': "triangle", 'radius': 3, "fillOpacity": 0.75, "pane": 'AV'};    }
};
var avolcLayer = new L.GeoJSON.AJAX(avolcURL,
  {pointToLayer: function (feature, latlng) {
    var marker = L.shapeMarker(latlng, avolcStyle(feature));
    (map.getZoom() >= 10
        ? marker.bindTooltip(feature.properties.Name_eng, {className: 'avolcLabels', permanent:true})
        : marker.bindTooltip(feature.properties.Name_eng, {className: 'avolcLabels', permanent:false} )
    );
    return marker} }
).addTo(map);

// Seismic activity
 
